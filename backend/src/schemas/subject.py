from pydantic import BaseModel, Field
from typing import Optional

class Subject(BaseModel):
     id: str
     subjectCode:str
     subjectName:str
     year:int
     lectureId:str
     semester:int
     academicYear:int
           
     class Config:
        schema_extra = {
        "example": {
            "id": "64882f6c32d15c1d89f06cdf",
            "subjectCode": "SCS2213",
            "subjectName":"DSA",
            "year": 2022,
            "lectureId": "64873b4029eb156b34979ab0",
            "semester":2 ,
            "academicYear":2,
            }
        }

     



