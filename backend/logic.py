def calculate_salary_logic(gross_monthly: float, sector: str, children: int, is_married: bool):
    # 1. Προσδιορισμός Μηνών (Kariera Style)
    months = 14 if sector == "private" else 12
    annual_gross = gross_monthly * months
    
    # 2. Κρατήσεις ΕΦΚΑ (13.87% για τον εργαζόμενο)
    efka_rate = 0.1387
    annual_efka = annual_gross * efka_rate
    taxable_income = annual_gross - annual_efka
    
    # 3. Υπολογισμός Αφορολόγητου
    tax_free_base = 8636
    # Προσαύξηση βάσει παιδιών (Κλίμακα 2024-2026)
    child_bonuses = {0: 0, 1: 1000, 2: 2000, 3: 3000, 4: 4000}
    tax_free_limit = tax_free_base + child_bonuses.get(children, children * 1000)
    
    if is_married:
        tax_free_limit += 1000
        
    # 4. Υπολογισμός Φόρου (9% για το πρώτο κλιμάκιο μετά το αφορολόγητο)
    if taxable_income <= tax_free_limit:
        annual_tax = 0
    else:
        excess = taxable_income - tax_free_limit
        # Απλοποιημένος υπολογισμός για την άσκηση
        annual_tax = excess * 0.09
        
    annual_net = annual_gross - annual_efka - annual_tax
    
    return {
        "annual_gross": round(annual_gross, 2),
        "annual_net": round(annual_net, 2),
        "monthly_net": round(annual_net / months, 2),
        "annual_tax": round(annual_tax, 2),
        "tax_free_limit": tax_free_limit
    }