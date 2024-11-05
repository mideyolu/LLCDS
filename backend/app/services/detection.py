# import tensorflow as tf
import numpy as np
from PIL import Image
import os

# model = tf.keras.models.load_model("path/to/your/model")

def make_prediction(image_path: str):
    # image = Image.open(image_path)
    # image = image.resize((224, 224))  # Adjust to your model's input shape
    # image = np.array(image) / 255.0
    # image = np.expand_dims(image, axis=0)

    # prediction = model.predict(image)
    # os.remove(image_path)  # Delete image after inference

    # Assuming multi-class probabilities, return the class with highest probability
    # predicted_class = np.argmax(prediction, axis=1)[0]
    # confidence = prediction[0][predicted_class]
    predicted_class = 1
    confidence = 45

    return {"prediction": int(predicted_class), "confidence": float(confidence)}
