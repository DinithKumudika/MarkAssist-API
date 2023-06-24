from fastapi import Request
from bson.objectid import ObjectId
from typing import Optional
from config.database import Database
from schemas.paper import Paper

class PaperModel():
     collection: str = "papers"
     
     def get_collection(self, request: Request):
          return request.app.mongodb[self.collection]
     
     def list_papers(self, request: Request) -> list:
          papers = list(self.get_collection(request).find())
          for paper in papers:
               paper["id"] = str(paper["_id"]) 
               paper["user"] = str(paper["user"]) 
          return papers
     
     def by_id(self, request: Request, id: str) -> Paper:
          paper = self.get_collection(request).find_one({"_id": ObjectId(id)})
          if paper:
               paper["id"] = str(paper["_id"])
               paper["user"] = str(paper["user"])
               return paper
          
     def by_user_id(self, request:Request, id:str) -> list:
          papers = list(self.get_collection(request).find({"user": ObjectId(id)}))

          for paper in papers:
               paper["id"] = str(paper["_id"]) 
               paper["user"] = str(paper["user"]) 
          return papers
     
     
     def delete(self, request: Request, id: str):
          paper = self.get_collection(request).find_one_and_delete({"_id": ObjectId(id)})