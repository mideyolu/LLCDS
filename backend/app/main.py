from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth, protected

app = FastAPI()

# Initialize tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth.router, prefix="/auth")
app.include_router(protected.router, prefix="/protected")
