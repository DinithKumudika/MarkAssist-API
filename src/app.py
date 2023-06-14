from fastapi import FastAPI

from bson.objectid import ObjectId
from typing import Optional

from config.database import Database

# routes
import routes.user as user_router
import routes.paper as paper_router
import routes.answer as answer_router

from scripts.text import preprocess, compare

app = FastAPI()
app.include_router(user_router.router)
app.include_router(paper_router.router)
app.include_router(answer_router.router)

@app.on_event("startup")
async def startup_db_client():
     database = Database()
     app.mongodb = database.connect()
     app.mongodb_client = database.get_client()


@app.on_event("shutdown")
async def shutdown_db_client():
     app.mongodb_client.close()


@app.get("/", tags=["Root"])
async def read_root():
     return {
          "message": "welcome to markAssist API"
     }