FROM python:3.10.9-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD [ "fastapi", "run", "app.py", "--port", "5000"]
