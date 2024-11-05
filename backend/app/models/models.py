from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Provider(Base):
    __tablename__ = "provider"
    provider_id = Column(Integer, index=True, primary_key=True)
    provider_username= Column(String(50), unique=True, nullable=False)
    provider_email = Column(String(255), unique=True ,nullable=False)
    provider_password = Column(String(255), nullable=False)
    patients = relationship("Patient", back_populates="provider")


class Patient(Base):
    __tablename__ = "patient"
    patient_id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("provider.provider_id"))
    patient_name = Column(String(150), nullable=False)
    patient_age = Column(Integer, nullable=False)
    patient_gender = Column(String(7), nullable=False)
    patient_email = Column(String(255), unique=True, nullable=False)
    patient_notes = Column(String(255))
    provider = relationship("Provider", back_populates="patients")


class Diagnosis(Base):
    __tablename__ = "diagnosis"
    diagnosis_id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("provider.provider_id"))
    patient_id = Column(Integer, ForeignKey("patient.patient_id"))
    prediction = Column(String(50), nullable=False)

class Log(Base):
    __tablename__ = "log"
    log_id = Column(Integer, primary_key=True, index=True)
    action = Column(String(255), nullable=False)
    created_at = Column(Date, nullable=False)
