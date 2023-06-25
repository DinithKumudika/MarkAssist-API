from fastapi import APIRouter

from api.api_v1.endpoints import user
from api.api_v1.endpoints import auth
from api.api_v1.endpoints import subject
from api.api_v1.endpoints import paper
from api.api_v1.endpoints import answer

router = APIRouter()

# register routes
router.include_router(auth.router, tags=["authentication"], prefix="/auth")
router.include_router(user.router, tags=["users"], prefix="/users")
router.include_router(paper.router,  tags=["papers"], prefix="/papers")
router.include_router(answer.router, tags=["answers"], prefix="/answers")
router.include_router(subject.router, tags=["subjects"], prefix="/subjects")