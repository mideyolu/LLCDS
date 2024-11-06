from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth, protected
from fastapi.middleware.cors import CORSMiddleware



# Initialize tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow your React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Register routes
app.include_router(auth.router, prefix="/auth")
app.include_router(protected.router, prefix="/protected")
