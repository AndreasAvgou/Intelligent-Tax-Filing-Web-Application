import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // --- HOME PAGE (ΠΡΟΣΘΗΚΗ) ---
          "aiPowered": "Intelligent Tax Filing",
          "homeTitle": "Intelligent Tax Filing",
          "homeDesc": "The most sophisticated platform for Greek tax assistance. Bridge the gap between complex legislation and your net income with our AI powered engine.",
          "getStarted": "Start Calculating",
          "featAccuracy": "Accuracy",
          "featAccuracyDesc": "Calculations based on the latest tax laws.",
          "featSpeed": "Speed",
          "featSpeedDesc": "Personalized strategies generated instantly by OpenAI.",
          "featBilingual": "Bilingual",
          "featBilingualDesc": "Native support for Greek and English language seamlessly.",
          "navHome": "Home",

          // General
          "appTitle": "Intelligent Tax Filing",
          "appSubtitle": "Smart analysis of gross and net earnings.",
          "title": "Intelligent Tax Filing",
          "description": "A sophisticated web application providing intelligent tax filing assistance using Artificial Intelligence.",

          // Form
          "formTitle": "Calculation Details",
          "formDesc": "Enter your monthly or annual salary for analysis.",
          "grossSalaryLabel": "Monthly Gross (€)",
          "annualGrossLabel": "Annual Gross (€)",
          "estimatedNetLabel": "Estimated Net",
          "sectorLabel": "Sector of Employment",
          "privateSector": "Private",
          "publicSector": "Public",
          "marriedLabel": "Married",
          "marriedDesc": "Affects the tax-free limit",
          "taxFreeLimit": "Current Tax-Free",
          "childrenLabel": "Number of Children",
          "analyzeButton": "Calculate & Analysis",
          "loadingText": "Processing...",

          // Results Section
          "resultsTitle": "Analysis Results",
          "resultsDesc": "Analysis of your net earnings",
          "annualGross": "Annual Gross",
          "annualNet": "Annual Net",
          "annualTax": "Annual Tax",
          "monthlyNet": "Monthly Net",
          "monthlyNetDesc": "The amount that will be deposited into your account every month.",
          "aiTitle": "Intelligent Advice",
          "aiStrategyLabel": "Advice",
          "aiDefault": "Analysis complete. Consult your accountant for details.",

          // Notifications & Errors
          "successCalculation": "Calculation complete!",
          "errorSalary": "Please enter a valid salary.",
          "errorConnection": "Failed to connect to the backend server.",
          "errorNegative": "Amounts cannot be negative!",
          "errorZero": "Please enter a valid income."
        }
      },
      el: {
        translation: {
          // --- HOME PAGE (ΠΡΟΣΘΗΚΗ) ---
          "aiPowered": "Έξυπνη Φορολογική Ανάλυση",
          "homeTitle": "Έξυπνη Φορολογική Ανάλυση",
          "homeDesc": "Η πιο εξελιγμένη πλατφόρμα για την υποστήριξη των φορολογικών σας δηλώσεων. Γεφυρώστε το χάσμα μεταξύ της περίπλοκης νομοθεσίας και του καθαρού σας εισοδήματος με τη δύναμη της τεχνητής νοημοσύνης.",
          "getStarted": "Ξεκινήστε τον Υπολογισμό",
          "featAccuracy": "Ακρίβεια",
          "featAccuracyDesc": "Υπολογισμοί βασισμένοι στην τρέχουσα νομοθεσία για ιδιωτικό και δημόσιο τομέα.",
          "featSpeed": "Ταχύτητα",
          "featSpeedDesc": "Λάβετε φορολογικές συμβουλές ακαριαία χάρη στο μοντέλο της τεχνητής νοημοσύνης.",
          "featBilingual": "Δίγλωσσο",
          "featBilingualDesc": "Πλήρης υποστήριξη Ελληνικών και Αγγλικών σε όλη την εμπειρία χρήσης.",
          "navHome": "Αρχική",

          // Γενικά
          "appTitle": "Έξυπνη Φορολογική Ανάλυση",
          "appSubtitle": "Έξυπνη ανάλυση μεικτών και καθαρών αποδοχών.",
          "title": "Έξυπνος Βοηθός Φορολογίας",
          "description": "Μια εξελιγμένη εφαρμογή που χρησιμοποιεί τεχνητή νοημοσύνη για να σας παρέχει έξυπνη φορολογική βοήθεια.",

          // Φόρμα
          "formTitle": "Στοιχεία Υπολογισμού",
          "formDesc": "Εισάγετε τον μηνιαίο ή ετήσιο μισθό σας για ανάλυση.",
          "grossSalaryLabel": "Μηνιαία Μεικτά (€)",
          "annualGrossLabel": "Ετήσια Μεικτά (€)",
          "estimatedNetLabel": "Εκτίμηση Καθαρού",
          "sectorLabel": "Τομέας Απασχόλησης",
          "privateSector": "Ιδιωτικός",
          "publicSector": "Δημόσιος",
          "marriedLabel": "Έγγαμος/η",
          "marriedDesc": "Επηρεάζει το αφορολόγητο όριο",
          "taxFreeLimit": "Τρέχον Αφορολόγητο",
          "childrenLabel": "Αριθμός Παιδιών",
          "analyzeButton": "Υπολογισμός & Ανάλυση",
          "loadingText": "Επεξεργασία...",

          // Ενότητα Αποτελεσμάτων
          "resultsTitle": "Αποτελέσματα Ανάλυσης",
          "resultsDesc": "Η ανάλυση των καθαρών σας αποδοχών",
          "annualGross": "Μεικτά Ετήσια",
          "annualNet": "Καθαρά Ετήσια",
          "annualTax": "Ετήσιος Φόρος",
          "monthlyNet": "Μηνιαία Καθαρά",
          "monthlyNetDesc": "Το ποσό που θα μπαίνει στο λογαριασμό σας κάθε μήνα.",
          "aiTitle": "Intelligent Advice",
          "aiStrategyLabel": "Συμβουλή",
          "aiDefault": "Η ανάλυση ολοκληρώθηκε. Συμβουλευτείτε το λογιστή σας για λεπτομέρειες.",

          // Ειδοποιήσεις & Σφάλματα
          "successCalculation": "Ο υπολογισμός ολοκληρώθηκε!",
          "errorSalary": "Παρακαλώ εισάγετε ένα έγκυρο ποσό.",
          "errorConnection": "Αποτυχία σύνδεσης με το διακομιστή (Backend).",
          "errorNegative": "Τα ποσά δεν μπορεί να είναι αρνητικά!",
          "errorZero": "Παρακαλώ εισάγετε ένα έγκυρο εισόδημα."
        }
      }
    },
    fallbackLng: 'el',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;