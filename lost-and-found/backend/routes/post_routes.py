import os
import shutil
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session, joinedload
from backend.database import SessionLocal
from backend import models
from backend.models import Post
from backend.schemas import PostOut

router = APIRouter()

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/api/posts", response_model=list[PostOut])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).options(joinedload(models.Post.user)).all()
    return posts

@router.post("/api/posts")
async def create_post(
    report_type: str = Form(...),
    item_name: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    contact_details: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    user_id: int = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    try:
        image_path = None

        if image and image.filename:
            safe_filename = image.filename.replace(" ", "_")
            file_location = os.path.join(UPLOAD_DIR, safe_filename)

            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            image_path = file_location

        new_post = Post(
            report_type=report_type,
            item_name=item_name,
            description=description,
            location=location,
            contact_details=contact_details,
            date=date,
            time=time,
            image_path=image_path,
            user_id=user_id,
        )
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        print(f" Received user_id: {user_id}")

        return {"message": "Post created successfully", "post": new_post}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
