from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from models import TaxRequest, TaxResponse
from logic import calculate_salary_logic
from ai_service import get_ai_advice
import os

app = FastAPI(title="Intelligent Tax Assistant API")

# Ρυθμίσεις CORS (Χρήσιμο κυρίως για το development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Επιτρέπουμε όλες τις προελεύσεις για το Docker deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Endpoint για τους υπολογισμούς
@app.post("/api/calculate", response_model=TaxResponse)
async def calculate(data: TaxRequest):
    try:
        # Μαθηματικοί υπολογισμοί
        results = calculate_salary_logic(
            data.gross_salary, data.sector, data.children, data.is_married
        )
        
        # Κλήση AI με τη γλώσσα που ήρθε από το frontend
        ai_insight = get_ai_advice(results, lang=data.lang)
            
        return {**results, "ai_advice": ai_insight}
        
    except Exception as e:
        print(f"Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# --- ΠΡΟΣΘΗΚΗ ΓΙΑ ΤΟ ΕΝΙΑΙΟ DOCKERFILE ---

# 2. Σερβίρισμα των στατικών αρχείων (JS, CSS, Images) του React
# Τα αρχεία αυτά παράγονται από το 'npm run build' και αντιγράφονται στον φάκελο static
if os.path.exists("static/assets"):
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")

# 3. Catch-all route για να φορτώνει το React App σε κάθε URL
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    # Αν η διαδρομή ξεκινάει με 'api', αφήνουμε το FastAPI να επιστρέψει 404 αν δεν υπάρχει το endpoint
    if full_path.startswith("api"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    # Για όλες τις άλλες διαδρομές, στέλνουμε το index.html του React
    index_path = os.path.join("static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {"message": "Backend is running, but Frontend build was not found."}

if __name__ == "__main__":
    import uvicorn
    # Χρησιμοποιούμε 0.0.0.0 για να είναι προσβάσιμο μέσα από το Docker
    uvicorn.run(app, host="0.0.0.0", port=8000)