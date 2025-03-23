# from sqlalchemy import Column, Integer, String
# from backend.database import Base  # ✅ Import Base correctly

# class Post(Base):
#     __tablename__ = "posts"

#     id = Column(Integer, primary_key=True, index=True)
#     report_type = Column(String, nullable=False)  # ✅ Matches frontend
#     item_name = Column(String, nullable=False)
#     description = Column(String, nullable=False)
#     location = Column(String, nullable=False)
#     contact_details = Column(String, nullable=False)
#     date = Column(String, nullable=False)
#     time = Column(String, nullable=True)
#     image_path = Column(String, nullable=True)  # ✅ Match backend & database


from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    posts = relationship("Post", back_populates="user")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String, nullable=False)
    item_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    contact_details = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=True)
    image_path = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))  # ✅ This is required
    user = relationship("User", back_populates="posts")  # ✅ This is optional, for ORM use
