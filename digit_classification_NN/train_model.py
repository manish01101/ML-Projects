import numpy as np
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
from keras.datasets import mnist

# Set random seed
tf.random.set_seed(3)

# Load data
(X_train, Y_train), (X_test, Y_test) = mnist.load_data()

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
model.save("mnist_model.h5")
