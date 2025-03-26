import sys
import os

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.database import SessionLocal
from backend.models import User

db = SessionLocal()

dummy_users = [
    {"username": "admin", "email": "admin@example.com", "password": "admin123"},
    {"username": "nivya", "email": "nivya@example.com", "password": "nivya123"},
    {"username": "fayaaz", "email": "fayaaz@example.com", "password": "fayaaz123"},
]

try:
    for user_data in dummy_users:
        existing_user = db.query(User).filter_by(email=user_data["email"]).first()
        if not existing_user:
            user = User(**user_data)
            db.add(user)
            print(f"✅ Added user: {user.username}")
        else:
            print(f"⚠️ User already exists: {existing_user.username}")

    db.commit()
    print("🎉 Dummy users added successfully!")

except Exception as e:
    print("❌ Error adding users:", e)
    db.rollback()

finally:
    db.close()
