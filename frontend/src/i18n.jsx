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
          "title": "Intelligent Tax Filing",
          "description": "A sophisticated web application providing intelligent tax filing assistance using AI.",
          "formTitle": "Tax Declaration",
          "formDesc": "Enter your financial data for analysis.",
          "incomeLabel": "Annual Income (€)",
          "incomePlaceholder": "e.g. 25000",
          "expensesLabel": "Total Expenses (€)",
          "expensesPlaceholder": "e.g. 8000",
          "submitButton": "Analyze with AI",
          "loadingText": "Processing...",
          "successTitle": "Data saved locally!",
          "successDesc": "In the next step we will connect to the AI API.",
          "errorNegative": "Amounts cannot be negative!",
          "errorZero": "Please enter a valid income."
        }
      },
      el: {
        translation: {
          "title": "Έξυπνος Βοηθός Φορολογίας",
          "description": "Μια εξελιγμένη εφαρμογή που χρησιμοποιεί AI για να σας παρέχει έξυπνη φορολογική βοήθεια.",
          "formTitle": "Φορολογική Δήλωση",
          "formDesc": "Εισάγετε τα οικονομικά σας δεδομένα για ανάλυση.",
          "incomeLabel": "Ετήσιο Εισόδημα (€)",
          "incomePlaceholder": "π.χ. 25000",
          "expensesLabel": "Συνολικά Έξοδα (€)",
          "expensesPlaceholder": "π.χ. 8000",
          "submitButton": "Ανάλυση με AI",
          "loadingText": "Επεξεργασία...",
          "successTitle": "Τα στοιχεία καταχωρήθηκαν τοπικά!",
          "successDesc": "Στο επόμενο βήμα θα συνδεθούμε με το AI API.",
          "errorNegative": "Τα ποσά δεν μπορεί να είναι αρνητικά!",
          "errorZero": "Παρακαλώ εισάγετε ένα έγκυρο εισόδημα."
        }
      }
    },
    fallbackLng: 'el', // Προεπιλεγμένη γλώσσα τα Ελληνικά
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;