from sqlalchemy.orm import Session
from app.models.models import Patient, Diagnosis

def create_patient(db: Session, patient_data: dict) -> Patient:
    """
    Create a new patient record in the database.

    Args:
        db (Session): The database session to interact with the database.
        patient_data (dict): A dictionary containing patient information.

    Returns:
        Patient: The newly created Patient object from the database.
    """
    # Instantiate a Patient object using the provided patient data
    db_patient = Patient(**patient_data)
    # Add the new patient to the database session
    db.add(db_patient)
    # Commit the session to save the new patient record to the database
    db.commit()
    # Refresh the instance to reflect the state of the newly created record
    db.refresh(db_patient)
    return db_patient  # Return the created Patient object


def create_diagnosis(db: Session, diagnosis_data: dict) -> Diagnosis:
    """
    Create a new diagnosis record in the database.

    Args:
        db (Session): The database session to interact with the database.
        diagnosis_data (dict): A dictionary containing diagnosis information.

    Returns:
        Diagnosis: The newly created Diagnosis object from the database.
    """
    # Instantiate a Diagnosis object using the provided diagnosis data
    db_diagnosis = Diagnosis(**diagnosis_data)
    # Add the new diagnosis to the database session
    db.add(db_diagnosis)
    # Commit the session to save the new diagnosis record to the database
    db.commit()
    # Refresh the instance to reflect the state of the newly created record
    db.refresh(db_diagnosis)
    return db_diagnosis  # Return the created Diagnosis object
