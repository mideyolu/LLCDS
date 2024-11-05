from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.detection import make_prediction
from app.dependencies import get_current_user
from app.crud.patient import create_patient
from app.crud.patient import create_diagnosis
from app.schemas.patient import PatientCreate, DiagnosisCreate
import shutil
import os

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_data(current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    # Logic to fetch patient data and predicted labels
    # Fetch total number of patients, etc.
    return {"message": "Dashboard data"}




@router.post("/detect")
def detect(
    patient_data: PatientCreate,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """
    Detect route that processes an uploaded image and patient data.
    After prediction, it stores the patient and diagnosis information in the database.

    Args:
        patient_data (PatientCreate): Patient information from request.
        image (UploadFile): CT scan image file.
        db (Session): Database session.
        current_user (str): Currently authenticated user.

    Returns:
        dict: Prediction result with confidence and saved patient/diagnosis information.
    """

    # Save the image temporarily for model processing
    image_path = f"temp/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Perform prediction using the uploaded image
    try:
        result = make_prediction(image_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing image.")

    # Delete the temporary image file after inference
    os.remove(image_path)

    # Save patient data to the database
    patient = create_patient(db, patient_data.model_dump())

    # Save diagnosis result to the database with reference to the patient
    diagnosis_data = DiagnosisCreate(prediction=result["prediction"])
    diagnosis = create_diagnosis(db, {**diagnosis_data.model_dump(), "patient_id": patient.patient_id})

    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "patient_id": patient.patient_id,
        "diagnosis_id": diagnosis.diagnosis_id
    }
