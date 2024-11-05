from sqlalchemy.orm import Session
from app.models.models import Provider
from app.schemas.auth import UserSignup
from hashlib import sha256
from typing import Optional

def create_provider(db: Session, user: UserSignup) -> Provider:
    """
    Create a new provider record in the database.

    Args:
        db (Session): The database session to interact with the database.
        user (UserSignup): The user information used to create the provider.

    Returns:
        Provider: The newly created Provider object from the database.
    """
    # Hash the user's password for secure storage
    hashed_password = sha256(user.password.encode()).hexdigest()

    # Create a Provider object with the provided username, email, and hashed password
    db_user = Provider(provider_username=user.username,
                       provider_email=user.email,
                       provider_password=hashed_password)

    # Add the new provider to the database session
    db.add(db_user)
    # Commit the session to save the new provider record to the database
    db.commit()
    # Refresh the instance to reflect the state of the newly created record
    db.refresh(db_user)

    return db_user  # Return the created Provider object


def get_provider_by_username(db: Session, username: str) -> Optional[Provider]:
    """
    Retrieve a provider record from the database by username.

    Args:
        db (Session): The database session to interact with the database.
        username (str): The username of the provider to be retrieved.

    Returns:
        Optional[Provider]: The Provider object if found, otherwise None.
    """
    # Query the database for a provider with the given username and return the first result
    return db.query(Provider).filter(Provider.provider_username == username).first()


def get_provider_by_email(db: Session, email: str) -> Optional[Provider]:
    """
    Retrieve a provider record from the database by email.

    Args:
        db (Session): The database session to interact with the database.
        email (str): The email of the provider to be retrieved.

    Returns:
        Optional[Provider]: The Provider object if found, otherwise None.
    """
    # Query the database for a provider with the given email and return the first result
    return db.query(Provider).filter(Provider.provider_email == email).first()
