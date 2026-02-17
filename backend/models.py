from pydantic import BaseModel, Field

class TaxRequest(BaseModel):
    gross_salary: float = Field(..., gt=0)
    sector: str  # "private" ή "public"
    children: int = Field(0, ge=0)
    is_married: bool
    lang: str = "el"

class TaxResponse(BaseModel):
    annual_gross: float
    annual_net: float
    monthly_net: float
    annual_tax: float
    tax_free_limit: float
    ai_advice: str
    status: str = "success"