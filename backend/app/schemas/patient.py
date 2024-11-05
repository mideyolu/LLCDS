# app/schemas/aptient.py
from pydantic import BaseModel


class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    email: str
    notes: str

class DiagnosisCreate(BaseModel):
    prediction: str
