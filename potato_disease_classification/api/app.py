from fastapi import FastAPI, File, UploadFile
import numpy as np
from io import BytesIO
import tensorflow as tf
from PIL import Image
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load model
MODEL = tf.keras.models.load_model("./model.keras")
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

@app.get("/")
async def root():
    return {"message": "FastAPI is running on Hugging Face!"}

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())

    #convert to batch (model expects batch input)
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    return {
        "class": predicted_class,
        "confidence": float(confidence)
    }

# if __name__ == "__main__":
#     uvicorn.run(app, host="localhost", port=8000)
