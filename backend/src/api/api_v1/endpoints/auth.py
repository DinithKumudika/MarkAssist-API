import hashlib
from fastapi import APIRouter, Body, Depends, Request, Response, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId
from typing import Union

from datetime import datetime, timedelta

from models.user import UserModel
from schemas.user import User, UserCreate, UserVerify, StudentCreate, TeacherCreate
from schemas.token import Token
from utils.auth import generate_token
from utils.hashing import Hasher
from utils.mails import send_email_verification_email
from utils.verification import create_token, create_verification_code

router = APIRouter()
user_model = UserModel()


# login user
@router.post("/token", response_description="get OAuth2 Token", response_model=Token)
async def login(request: Request, payload: OAuth2PasswordRequestForm = Depends()):
    user = user_model.by_email(request, payload.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    if not Hasher.verify_password(payload.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = generate_token({
        "user_id": user["id"],
        "username": user["email"],
        "user_role": user["userType"]
    })

    return Token(access_token=token, token_type="bearer")


# register new user
@router.post("/register", response_description="Create new user", response_model=User)
async def register(request: Request, type: str, payload: Union[StudentCreate, TeacherCreate] = Body()) -> User:
    
    user = user_model.by_email(request, payload.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="user already exists"
        )
    
    payload.password = Hasher.get_password_hash(payload.password)
    payload.createdAt = datetime.utcnow()
    payload.updatedAt = payload.createdAt
    
    new_user_id = user_model.create_user(request, payload)
    user = user_model.by_id(request, new_user_id)

    if user:
        print("created user", user)
        token = create_token()
        verification_code = create_verification_code(token)
        # verifying_user = {
        #     "verificationCode": verification_code,
        #     "updatedAt": datetime.utcnow()
        # }
        verifying_user = UserVerify(
            verificationCode=verification_code, 
            updatedAt=datetime.utcnow()
        )

        updated_user = user_model.update_single(request, "_id", ObjectId(new_user_id), verifying_user.dict())
        print("user updated", updated_user)
        
        if updated_user:
            url = f"http://localhost:5000/verify-account/{token.hex()}"
        
            try:
                send_email_verification_email(to=payload.email, name=payload.firstName, url=url)
                return JSONResponse(
                    {'status': 'email sent'},
                    status_code=status.HTTP_200_OK
                )
            except Exception as e:
                print(str(e))
                return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="couldn't create new user"
    )


@router.get('/logout', response_description="logout user")
async def logout():
    pass


@router.post('/validate-email')
async def validate_email(request: Request, payload: str):
    pass


@router.post('accountVerification')
async def send_verification_code(request: Request, to: str):
    token = create_token()
    verification_code = create_verification_code(token)
        
    url = f"http://localhost:5000/verify-account/{token.hex()}"
    name = "Dinith"
        
    try:
        send_email_verification_email(to, name=name, url=url)
        return JSONResponse(
            {'status': 'email sent'},
            status_code=status.HTTP_200_OK
        )
    except Exception as e:
        print(str(e))
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get('/verify-email/{token}', response_description="verify email")
async def verify_token(request: Request, token: str):        
    hashed_code = hashlib.sha256()
    hashed_code.update(bytes.fromhex(token))
    verification_code = hashed_code.hexdigest()
    
    user = user_model.find(request, "verificationCode", verification_code)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Invalid code or user doesn't exist"
        )
    
    if user.emailActive:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail='Email can only be verified once'
        )
    
    verify_user = UserVerify(emailActive=True, updatedAt=datetime.utcnow())
    updated_user = user_model.update_single(request, "_id", ObjectId(user.id), verify_user.dict())
    
    if updated_user:
        return JSONResponse(
            {
                "status": "success", 
                "message": "Account verified"
            }, 
            status_code=status.HTTP_200_OK
        )
