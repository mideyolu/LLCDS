from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Patient, Diagnosis
from app.services.detection import make_prediction
from app.dependencies import get_current_user
from app.crud.patient import create_patient, create_diagnosis, get_all_patients
from app.schemas.patient import PatientCreate, DiagnosisCreate
import shutil
import os

router = APIRouter()



@router.get("/dashboard")
def get_dashboard_data(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Fetches data to display on the dashboard, such as patient records and statistics.

    Args:
        current_user (str): Currently authenticated user.
        db (Session): Database session.

    Returns:
        dict: Summary of dashboard data, including patient count and other statistics.
    """
    try:
        # Fetching all patients data
        patients = db.query(Patient).all()
        patient_count = len(patients)

        # You can choose to include additional patient details or diagnosis details here
        # For example, including their diagnosis predictions
        patient_details = [
            {
                "patient_id": patient.patient_id,
                "name": patient.patient_name,
                "age": patient.patient_age,
                "gender": patient.patient_gender,
                "email": patient.patient_email,
                "notes": patient.patient_notes,
                "diagnosis": db.query(Diagnosis).filter(Diagnosis.patient_id == patient.patient_id).first().prediction
            }
            for patient in patients
        ]

        return {
            "message": "Dashboard data",
            "patient_count": patient_count,
            "patients": patient_details
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching dashboard data.")



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
