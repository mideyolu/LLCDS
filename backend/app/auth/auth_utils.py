from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.config import settings

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """
    Create a JWT access token.

    Args:
        data (dict): The payload data to include in the JWT.
        expires_delta (timedelta, optional): The time delta for token expiration. If None, defaults to settings.

    Returns:
        str: The encoded JWT access token.
    """
    to_encode = data.copy()  # Make a copy of the data to encode
    # Set expiration time for the token
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})  # Add the expiration to the payload
    # Encode the JWT using the secret key and specified algorithm
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt  # Return the encoded JWT token
