from sqlalchemy.orm import Session
from app.models.models import Patient, Diagnosis

def create_patient(db: Session, patient_data):
    db_patient = Patient(**patient_data)
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def create_diagnosis(db: Session, diagnosis_data):
    db_diagnosis = Diagnosis(**diagnosis_data)
    db.add(db_diagnosis)
    db.commit()
    db.refresh(db_diagnosis)
    return db_diagnosis
