from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from models import TaxRequest, TaxResponse
from logic import calculate_salary_logic
from ai_service import get_ai_advice
import os

app = FastAPI(title="Intelligent Tax Assistant API")

# Ρυθμίσεις CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint
@app.post("/api/calculate", response_model=TaxResponse)
async def calculate(data: TaxRequest):
    try:
        # Υπολογισμοί
        results = calculate_salary_logic(
            data.gross_salary, data.sector, data.children, data.is_married
        )
        
        # Κλήση AI
        ai_insight = get_ai_advice(results, lang=data.lang)
            
        return {**results, "ai_advice": ai_insight}
        
    except Exception as e:
        print(f"Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Σερβίρισμα των στατικών αρχείων React

if os.path.exists("static/assets"):
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")

# Catch-all route
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    if full_path.startswith("api"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    index_path = os.path.join("static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {"message": "Backend is running, but Frontend build was not found."}

if __name__ == "__main__":
    import uvicorn
    # Προσβάσιμο μέσα από το Docker
    uvicorn.run(app, host="0.0.0.0", port=8000)