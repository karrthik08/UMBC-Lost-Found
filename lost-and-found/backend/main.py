from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend import models
from backend.models import Post, User

from backend.database import engine
from backend.routes.post_routes import router as post_router

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Add CORS Middleware (Fixed Syntax)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # ✅ Fixed: Correctly closed string
)

# ✅ Root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Lost & Found API!"}

# ✅ Include API routes
app.include_router(post_router)

# ✅ Connect to database
models.Base.metadata.create_all(bind=engine)
