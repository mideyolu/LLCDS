from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import UserSignup, UserLogin
from app.crud.auth import create_provider, get_provider_by_username, get_provider_by_email
from app.auth.auth_utils import create_access_token
from hashlib import sha256
from datetime import timedelta
from app.config import settings

# Initialize router for authentication endpoints
router = APIRouter()

@router.post("/signup", response_model=dict)
def signup(user: UserSignup, db: Session = Depends(get_db)) -> dict:
    """
    Endpoint for user signup.
    - Checks if the username or email already exists.
    - If either exists, raises an HTTP 400 error.
    - Otherwise, creates a new user.

    Args:
        user (UserSignup): The user details for signup.
        db (Session): Database session dependency.

    Returns:
        dict: Confirmation message on successful creation.
    """
    # Check if username is already registered
    existing_user = get_provider_by_username(db, user.username)
    # Check if email is already registered
    existing_email = get_provider_by_email(db, user.email)

    # Raise error if username or email is already taken
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user in the database
    create_provider(db, user)
    return {"message": "User created successfully"}

@router.post("/login", response_model=dict)
def login(user: UserLogin, db: Session = Depends(get_db)) -> dict:
    """
    Endpoint for user login.
    - Verifies user credentials.
    - Returns a JWT access token if credentials are valid.

    Args:
        user (UserLogin): The user login credentials.
        db (Session): Database session dependency.

    Returns:
        dict: Access token and token type on successful login.
    """
    # Fetch user from the database by username
    db_user = get_provider_by_username(db, user.username)

    # Validate password
    if not db_user or db_user.provider_password != sha256(user.password.encode()).hexdigest():
        # Raise error if credentials are invalid
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Set the expiration time for the access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    # Generate JWT access token with expiration
    access_token = create_access_token(data={"sub": db_user.provider_username}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer", "message": "User Login successful"}
