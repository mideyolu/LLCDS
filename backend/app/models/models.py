from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Provider(Base):
    __tablename__ = "provider"  # Table name in the database
    provider_id = Column(Integer, index=True, primary_key=True)  # Unique identifier for each provider
    provider_username = Column(String(50), unique=True, nullable=False)  # Unique username for the provider
    provider_email = Column(String(255), unique=True, nullable=False)  # Unique email for the provider
    provider_password = Column(String(255), nullable=False)  # Hashed password for the provider
    # Relationship to link providers to their patients
    patients = relationship("Patient", back_populates="provider")


class Patient(Base):
    __tablename__ = "patient"  # Table name in the database
    patient_id = Column(Integer, primary_key=True, index=True)  # Unique identifier for each patient
    provider_id = Column(Integer, ForeignKey("provider.provider_id"))  # Foreign key linking to the provider
    patient_name = Column(String(150), nullable=False)  # Name of the patient
    patient_age = Column(Integer, nullable=False)  # Age of the patient
    patient_gender = Column(String(7), nullable=False)  # Gender of the patient
    patient_email = Column(String(255), unique=True, nullable=False)  # Unique email for the patient
    patient_notes = Column(String(255))  # Notes regarding the patient
    # Relationship to link patients to their provider
    provider = relationship("Provider", back_populates="patients")


class Diagnosis(Base):
    __tablename__ = "diagnosis"  # Table name in the database
    diagnosis_id = Column(Integer, primary_key=True, index=True)  # Unique identifier for each diagnosis
    provider_id = Column(Integer, ForeignKey("provider.provider_id"))  # Foreign key linking to the provider
    patient_id = Column(Integer, ForeignKey("patient.patient_id"))  # Foreign key linking to the patient
    prediction = Column(String(50), nullable=False)  # Prediction result for the patient's diagnosis


class Log(Base):
    __tablename__ = "log"  # Table name in the database
    log_id = Column(Integer, primary_key=True, index=True)  # Unique identifier for each log entry
    action = Column(String(255), nullable=False)  # Description of the action logged
    created_at = Column(Date, nullable=False)  # Timestamp of when the log entry was created
