from fastapi import Depends, HTTPException, Request, status
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose import jwt, JWTError

from datetime import datetime, timedelta

from models.user import UserModel
from schemas.user import User
from schemas.token import TokenData
from config.config import settings

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def generate_token(data:dict):
     to_encode = data.copy()
     expire_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
     to_encode.update({"exp": expire_at})
     
     jwt_token = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
     
     return jwt_token


def verify_token(token:str, credentials_exception):
     try:
          payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
          
          id: str = payload.get("user_id")
          username: str = payload.get("username")
          user_role: str = payload.get("user_role")
          
          if id is None or username is None or user_role is None:
               raise credentials_exception
          
          token_data = TokenData(id, username, user_role)
     except JWTError:
          raise credentials_exception
     
     return token_data


async def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
     credentials_exception= HTTPException(
          status_code=status.HTTP_401_UNAUTHORIZED, 
          detail="Could not validate credentials",
          headers={"WWW-Authenticate": "Bearer"},
     )
     token_data = verify_token(token, credentials_exception)
     user_model = UserModel()
     user = user_model.by_id(request, token_data.user_id)
     if user is None:
          raise credentials_exception
     return user


async def get_current_active_user(request: Request, current_user: User = Depends(get_current_user)):
     if current_user.isDeleted:
          raise HTTPException(
               status_code=status.HTTP_400_BAD_REQUEST, 
               detail="inactive user"
          )
     return current_user