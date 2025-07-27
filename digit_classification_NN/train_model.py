import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
import pandas as pd

# Set random seed
tf.random.set_seed(3)

# Load data
data = pd.read_csv("train.csv")

X = data.drop("label", axis=1).values
Y = data["label"].values

# Reshape to (num_samples, 28, 28)
X = X.reshape(-1, 28, 28)

# (X_train, Y_train), (X_test, Y_test) = mnist.load_data()
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Build model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(50, activation='relu'),
    keras.layers.Dense(50, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

# Compile model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train
model.fit(X_train, Y_train, epochs=10)

# Evaluate
loss, acc = model.evaluate(X_test, Y_test)
print(f"Test Accuracy: {acc*100:.2f}%")

# Save model
model.save("mnist_model.keras")
