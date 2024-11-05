import os

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:Hikaix_&99@localhost/lcd")
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
    ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Session timeout
    ALGORITHM = "HS256"

settings = Settings()
