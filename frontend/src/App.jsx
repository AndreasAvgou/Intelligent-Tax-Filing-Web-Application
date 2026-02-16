import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, Loader2, Languages } from "lucide-react" // Προσθήκη Languages icon
import { useTranslation } from "react-i18next" // Hook για τη μετάφραση

function App() {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation() // Initialize translation
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ income: "", expenses: "" })

  const handleToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  // Συνάρτηση για αλλαγή γλώσσας
  const toggleLanguage = () => {
    const newLang = i18n.language === "el" ? "en" : "el"
    i18n.changeLanguage(newLang)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // --- Input Validation ---
    if (Number(formData.income) < 0 || Number(formData.expenses) < 0) {
      toast.error(t("errorNegative", "Τα ποσά δεν μπορεί να είναι αρνητικά!"))
      return
    }
    if (Number(formData.income) === 0) {
      toast.warning(t("errorZero", "Παρακαλώ εισάγετε ένα έγκυρο εισόδημα."))
      return
    }

    setLoading(true)

    // Προσομοίωση αναμονής 
    setTimeout(() => {
      setLoading(false)
      toast.success(t("successTitle", "Τα στοιχεία καταχωρήθηκαν τοπικά!"), {
        description: t("successDesc", "Στο επόμενο βήμα θα συνδεθούμε με το AI API.")
      })
      console.log("Data to send to Backend (Step 2):", formData)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-6">
      <Toaster position="top-center" richColors />

      {/* Language & Dark Mode Toggles */}
      <div className="flex justify-end gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex gap-2">
          <Languages className="h-4 w-4" />
          {i18n.language === "el" ? "EN" : "EL"}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleToggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("title", "Intelligent Tax Filing")}
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          {t("description", "Μια εξελιγμένη εφαρμογή που χρησιμοποιεί AI για να σας παρέχει έξυπνη φορολογική βοήθεια.")}
        </p>
      </div>

      <Card className="max-w-md mx-auto shadow-2xl border-primary/10">
        <CardHeader>
          <CardTitle>{t("formTitle", "Φορολογική Δήλωση")}</CardTitle>
          <CardDescription>
            {t("formDesc", "Εισάγετε τα οικονομικά σας δεδομένα για ανάλυση.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="income">{t("incomeLabel", "Ετήσιο Εισόδημα (€)")}</Label>
              <Input
                id="income"
                type="number"
                required
                placeholder={t("incomePlaceholder", "π.χ. 25000")}
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenses">{t("expensesLabel", "Συνολικά Έξοδα (€)")}</Label>
              <Input
                id="expenses"
                type="number"
                required
                placeholder={t("expensesPlaceholder", "π.χ. 8000")}
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
              />
            </div>
            <Button className="w-full font-bold" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loadingText", "Επεξεργασία...")}
                </>
              ) : (
                t("submitButton", "Ανάλυση με AI")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App