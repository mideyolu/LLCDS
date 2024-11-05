from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import UserSignup, UserLogin
from app.crud.auth import create_provider, get_provider_by_username, get_provider_by_email
from app.auth.auth_utils import create_access_token
from hashlib import sha256
from datetime import timedelta
from app.config import settings  # Import your settings here

router = APIRouter()

@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    existing_user = get_provider_by_username(db, user.username)
    existing_email = get_provider_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    create_provider(db, user)
    return {"message": "User created successfully"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = get_provider_by_username(db, user.username)
    if not db_user or db_user.provider_password != sha256(user.password.encode()).hexdigest():
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": db_user.provider_username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
