from sqlalchemy.orm import Session
from app.models.models import Provider
from app.schemas.auth import UserSignup
from hashlib import sha256


def create_provider(db: Session, user: UserSignup):
    hashed_password = sha256(user.password.encode()).hexdigest()
    db_user = Provider(provider_username=user.username, provider_email=user.email, provider_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_provider_by_username(db: Session, username: str):
    return db.query(Provider).filter(Provider.provider_username == username).first()
def get_provider_by_email(db: Session, email: str):
    return db.query(Provider).filter(Provider.provider_email == email).first()
