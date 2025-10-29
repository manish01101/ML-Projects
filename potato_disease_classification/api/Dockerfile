FROM python:3.12-slim

WORKDIR /src

RUN apt-get update && apt-get install -y libgl1 libglib2.0-0

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Start FastAPI server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
