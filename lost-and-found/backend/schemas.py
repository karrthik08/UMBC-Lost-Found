from pydantic import BaseModel
from typing import Optional

class PostCreate(BaseModel):
    report_type: str
    item_name: str
    description: str
    location: str
    contact_details: str
    date: str
    time: str
    image: Optional[str] = None  # Optional image

class UserBase(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True

class PostOut(BaseModel):
    id: int
    report_type: str
    item_name: str
    description: str
    location: str
    contact_details: str
    date: str
    time: str
    image_path: Optional[str] = None
    user: Optional[UserBase] = None  # ✅ ensure this is set

    class Config:
        orm_mode = True
