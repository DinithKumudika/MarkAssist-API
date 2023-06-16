from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from bson.objectid import ObjectId
from typing import Optional

from config.database import Database

# routes
import routes.user as user_router
import routes.paper as paper_router
import routes.answer as answer_router

from scripts.text import preprocess, compare

app = FastAPI()

# origins = ['http://localhost:5000']

# app.add_middleware(
#      CORSMiddleware,
#      allow_origins = origins, 
#      allow_credentials = True, 
#      allow_methods = ["*"],
#      allow_headers = ["*"]
# )

app.include_router(user_router.router, tags=["users"], prefix="/users")
app.include_router(paper_router.router,  tags=["papers"], prefix="/papers")
app.include_router(answer_router.router, tags=["answers"], prefix="/answers")

@app.on_event("startup")
async def startup_db_client():
     try:
          database = Database()
          app.mongodb = database.connect()
          app.mongodb_client = database.get_client()
          print("You successfully connected to MongoDB!")
     except ConnectionError as e:
          print(str(e))


@app.on_event("shutdown")
async def shutdown_db_client():
     app.mongodb_client.close()


@app.get("/", tags=["Root"])
async def read_root():
     return {
          "message": "welcome to markAssist API"
     }