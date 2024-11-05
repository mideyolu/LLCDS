# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:Hikaix_&99@localhost/lcd")
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))  # Convert to int
    ALGORITHM = os.getenv("ALGORITHM", "HS256")

settings = Settings()
