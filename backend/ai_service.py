import os
from openai import OpenAI
from dotenv import load_dotenv

# Φορτώνει τις μεταβλητές από το .env αρχείο για ασφάλεια
load_dotenv()

# Αρχικοποίηση του client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_ai_advice(results: dict, lang: str = "el"):
    """
    Στέλνει τα αποτελέσματα στο GPT-4o και επιστρέφει φορολογικές συμβουλές
    ΤΑΥΤΟΧΡΟΝΑ σε δύο γλώσσες χωρισμένες με '###'.
    """
    try:
        # 1. Ορισμός του συστήματος για δίγλωσση απόκριση
        system_msg = (
            "You are an expert Greek tax consultant. "
            "You MUST provide your advice in BOTH Greek and English, "
            "separated EXACTLY by '###'."
        )

        # 2. Κατασκευή του μηνύματος προς την AI (Ζητάμε και τις δύο γλώσσες)
        user_msg = f"""
        Analyze the following Greek tax data:
        - Monthly Net: €{results['monthly_net']}
        - Annual Net: €{results['annual_net']}
        - Annual Tax: €{results['annual_tax']}
        - Tax-Free Limit: €{results['tax_free_limit']}
        
        Provide one essential tax advice (max 20 words).
        Format your response EXACTLY like this:
        [Greek advice text] ### [English advice text]
        """

        # 3. Κλήση στο GPT-4o
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_msg}
            ],
            max_tokens=150, # Αυξημένα tokens για να χωρέσουν και οι δύο προτάσεις
            temperature=0.7
        )
        
        
        return response.choices[0].message.content

    except Exception as e:
        print(f"AI Error: {e}")
        # Επιστροφή σφάλματος 
        return "Η AI συμβουλή δεν είναι διαθέσιμη. ### AI advice is currently unavailable."