from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.detection import make_prediction
from app.dependencies import get_current_user
import shutil
import os

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_data(current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    # Logic to fetch patient data and predicted labels
    # Fetch total number of patients, etc.
    return {"message": "Dashboard data"}

@router.post("/detect")
def detect(image: UploadFile = File(...), db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    image_path = f"temp/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    result = make_prediction(image_path)
    return {"prediction": result["prediction"], "confidence": result["confidence"]}
