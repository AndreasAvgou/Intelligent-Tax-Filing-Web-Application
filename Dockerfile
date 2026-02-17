# --- STAGE 1: Build the React Frontend ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# --- STAGE 2: Run the FastAPI Backend & Serve Frontend ---
FROM python:3.12-slim
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Backend code (main.py, ai_service.py, κλπ.)
COPY backend/ .

# Copy the built Frontend files to the backend static folder
COPY --from=frontend-build /app/frontend/dist ./static

# Expose port 8000 for the unified app
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]