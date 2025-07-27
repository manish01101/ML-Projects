import streamlit as st
import numpy as np
import cv2
from PIL import Image
from tensorflow import keras

# Loading model
model = keras.models.load_model("mnist_model.keras")

st.title("Handwritten Digit Classifier")
st.write("Upload a 28x28 (or similar) image of a digit (0-9).")

uploaded_file = st.file_uploader("Choose a digit image", type=["png", "jpg", "jpeg"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_container_width=True)

    # Convert to grayscale and resize
    image = np.array(image)
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    resized = cv2.resize(gray, (28, 28))
    normalized = resized / 255.0
    reshaped = np.reshape(normalized, (1, 28, 28))

    # Predict
    prediction = model.predict(reshaped)
    pred_label = np.argmax(prediction)

    st.success(f"Predicted Digit: **{pred_label}**")
