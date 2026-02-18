import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { useTranslation } from "react-i18next"
import {
  Loader2, Calculator, Sparkles, TrendingUp,
  Wallet, ReceiptText, Moon, Sun, Languages, ArrowRight, ShieldCheck, Zap
} from "lucide-react"

function App() {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  // --- ΠΡΟΣΘΗΚΗ: State για την πλοήγηση μεταξύ Home και Calculator ---
  const [view, setView] = useState("home")

  const [formData, setFormData] = useState({
    grossSalary: "",      // Μηνιαίος
    annualGross: "",      // Ετήσιος
    sector: "private",
    children: "0",
    isMarried: false
  })

  // --- Βοηθητική συνάρτηση για format 1.000,00 (Ευρωπαϊκό πρότυπο) ---
  const formatAmount = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "0,00";
    return new Intl.NumberFormat('el-GR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // --- ΠΡΟΣΘΗΚΗ: Υπολογισμός αφορολόγητου σε πραγματικό χρόνο για το UI ---
  const calculateTaxFree = () => {
    let base = 8636;
    let bonus = (parseInt(formData.children) || 0) * 1000;
    if (formData.isMarried) bonus += 1000;
    return base + bonus;
  };
  const currentTaxFree = calculateTaxFree();

  // --- ΠΡΟΣΘΗΚΗ: Υπολογισμός "Live" Καθαρού Μηνιαίου για τη φόρμα ---
  const calculateLiveNet = () => {
    const gross = parseFloat(formData.grossSalary) || 0;
    if (gross <= 0) return "0.00";
    // Προσέγγιση: Μεικτά - ΕΦΚΑ (13.87%) - Φόρος (περίπου 9% πάνω από το αφορολόγητο)
    const afterEfka = gross * (1 - 0.1387);
    const taxFreeMonthly = 720; // Κατά προσέγγιση 8636 / 12
    let tax = 0;
    if (afterEfka > taxFreeMonthly) tax = (afterEfka - taxFreeMonthly) * 0.09;
    return (afterEfka - tax).toFixed(2);
  };
  const liveNet = calculateLiveNet();

  // Διαχείριση Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Αυτόματος υπολογισμός Ετήσιου/Μηνιαίου όταν αλλάζει ο τομέας ή ο μισθός
  const updateSalaries = (value, type, currentSector) => {
    const months = currentSector === "private" ? 14 : 12
    if (type === "monthly") {
      const annual = value ? (parseFloat(value) * months).toFixed(2) : ""
      setFormData(prev => ({ ...prev, grossSalary: value, annualGross: annual }))
    } else {
      const monthly = value ? (parseFloat(value) / months).toFixed(2) : ""
      setFormData(prev => ({ ...prev, annualGross: value, grossSalary: monthly }))
    }
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'el' ? 'en' : 'el'
    i18n.changeLanguage(newLang)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Number(formData.grossSalary) <= 0) {
      toast.error(t("errorSalary", "Παρακαλώ εισάγετε έγκυρο μισθό"))
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gross_salary: parseFloat(formData.grossSalary),
          sector: formData.sector,
          children: parseInt(formData.children),
          is_married: formData.isMarried,
          lang: i18n.language // <-- ΠΡΟΣΘΗΚΗ: Στέλνουμε τη γλώσσα (el ή en)
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setResults(data)
        toast.success(t("successCalculation", "Ο υπολογισμός ολοκληρώθηκε!"))
      }
    } catch (error) {
      toast.error(t("errorConnection", "Αποτυχία σύνδεσης με το Server"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20 relative">
      <Toaster position="top-center" richColors />

      {/* --- TOP BAR (Πάνω Δεξιά) --- */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        {/* ΠΡΟΣΘΗΚΗ: Κουμπί επιστροφής στην αρχική αν είμαστε στον υπολογιστή */}
        {view === "calculator" && (
          <Button variant="ghost" size="sm" onClick={() => setView("home")} className="dark:text-slate-300">
            {t("navHome", "Αρχική")}
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 shadow-sm dark:bg-slate-800">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline uppercase">{i18n.language === 'el' ? 'EN' : 'EL'}</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)} className="shadow-sm dark:bg-slate-800">
          {darkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-slate-700" />}
        </Button>
      </div>

      {/* --- ΠΡΟΣΘΗΚΗ: CONDITIONALLY RENDER HOME OR CALCULATOR --- */}
      {view === "home" ? (
        <div className="max-w-4xl mx-auto pt-24 px-4 text-center animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            {t("aiPowered", "Next-Gen AI Analysis")}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight dark:text-white mb-6">
            {t("homeTitle", "Intelligent Tax Filing")}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("homeDesc", "The most sophisticated platform for Greek tax assistance. Bridge the gap between complex legislation and your net income with our GPT-4o powered engine.")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => setView("calculator")} className="h-14 px-8 text-lg font-bold rounded-full gap-2 shadow-xl hover:scale-105 transition-all">
              {t("getStarted", "Ξεκινήστε τον Υπολογισμό")} <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t pt-16 dark:border-slate-800">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl dark:text-white">{t("featAccuracy", "Ακρίβεια")}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t("featAccuracyDesc", "Υπολογισμοί βασισμένοι στην τρέχουσα νομοθεσία για ιδιωτικό και δημόσιο τομέα.")}</p>
            </div>
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl dark:text-white">{t("featSpeed", "Ταχύτητα AI")}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t("featSpeedDesc", "Λάβετε φορολογικές συμβουλές ακαριαία χάρη στο μοντέλο GPT-4o.")}</p>
            </div>
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl dark:text-white">{t("featBilingual", "Δίγλωσσο")}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t("featBilingualDesc", "Πλήρης υποστήριξη Ελληνικών και Αγγλικών σε όλη την εμπειρία χρήσης.")}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto pt-16 px-4 animate-in slide-in-from-right-4 duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold flex justify-center items-center gap-2 dark:text-white">
              <Calculator className="h-8 w-8 text-primary" />
              {t("appTitle", "Υπολογιστής Μισθού & AI")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("appSubtitle", "Έξυπνη ανάλυση μεικτών και καθαρών αποδοχών.")}
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-xl border-t-4 border-t-primary dark:bg-slate-900 overflow-hidden">
            <CardHeader className="bg-white/50 dark:bg-white/5">
              <CardTitle className="dark:text-white">{t("formTitle", "Στοιχεία Υπολογισμού")}</CardTitle>
              <CardDescription>{t("formDesc", "Εισάγετε τον μηνιαίο ή ετήσιο μισθό σας.")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Salary Inputs - 3 ΣΤΗΛΕΣ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grossSalary" className="dark:text-slate-200 font-semibold">{t("grossSalaryLabel")}</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                      <Input
                        id="grossSalary"
                        type="number"
                        className="pl-7 dark:bg-slate-800 dark:text-white"
                        value={formData.grossSalary}
                        onChange={(e) => updateSalaries(e.target.value, "monthly", formData.sector)}
                        placeholder="1200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualGross" className="dark:text-slate-200 font-semibold">{t("annualGrossLabel")}</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                      <Input
                        id="annualGross"
                        type="text"
                        className="pl-7 dark:bg-slate-800 dark:text-white bg-slate-50/50 font-medium"
                        value={formData.annualGross ? formatAmount(parseFloat(formData.annualGross)) : ""}
                        readOnly
                        placeholder="16.800,00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-green-600 dark:text-green-400 font-bold tracking-tight">
                      {t("estimatedNetLabel")}
                    </Label>
                    <div className="h-10 w-full rounded-md border border-green-200 bg-green-50/50 dark:bg-green-900/20 dark:border-green-900/50 flex items-center px-3 text-green-700 dark:text-green-400 font-black">
                      € {formatAmount(parseFloat(liveNet))}
                    </div>
                  </div>
                </div>

                {/* Sector & Children */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="dark:text-slate-200">{t("sectorLabel")}</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(val) => {
                        setFormData(prev => ({ ...prev, sector: val }))
                        updateSalaries(formData.grossSalary, "monthly", val)
                      }}
                    >
                      <SelectTrigger className="dark:bg-slate-800 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">{t("privateSector")}</SelectItem>
                        <SelectItem value="public">{t("publicSector")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="children" className="dark:text-slate-200">{t("childrenLabel")}</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      value={formData.children}
                      onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                      className="dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Marital Status */}
                <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 transition-all">
                  <div className="space-y-0.5">
                    <Label htmlFor="isMarried" className="text-base font-medium dark:text-slate-200">{t("marriedLabel")}</Label>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      {t("marriedDesc")}
                      <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {t("taxFreeLimit")}: €{currentTaxFree.toLocaleString('el-GR')}
                      </span>
                    </p>
                  </div>
                  <Switch
                    id="isMarried"
                    checked={formData.isMarried}
                    onCheckedChange={(val) => setFormData({ ...formData, isMarried: val })}
                  />
                </div>

                <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin mr-2" /> : t("analyzeButton")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* --- RESULTS SECTION --- */}
          {results && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
              <Card className="border-2 border-green-500/20 dark:bg-slate-900 shadow-2xl">
                <CardHeader className="border-b bg-green-50/30 dark:bg-green-900/10">
                  <CardTitle className="text-xl flex items-center gap-2 text-green-700 dark:text-green-400 font-bold">
                    <TrendingUp className="h-5 w-5" />
                    {t("resultsTitle")}
                  </CardTitle>
                  <CardDescription>{t("resultsDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-8">

                  <div className="text-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">
                      {t("monthlyNet")}
                    </span>
                    <p className="text-6xl font-black text-green-600 drop-shadow-sm">
                      €{formatAmount(results.monthly_net)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      {t("monthlyNetDesc")}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-xs uppercase font-bold text-muted-foreground block">
                        {t("annualNet")}
                      </span>
                      <p className="text-3xl font-bold dark:text-white">
                        €{formatAmount(results.annual_net)}
                      </p>
                    </div>
                    <Wallet className="h-10 w-10 text-green-500 opacity-50" />
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-6 text-white shadow-lg">
                    <h4 className="font-bold flex items-center gap-2 mb-2 italic">
                      <Sparkles className="h-4 w-4" />
                      {/* --- ΠΡΟΣΘΗΚΗ: Δυναμικός τίτλος label ΕΔΩ --- */}
                      {t("aiStrategyLabel")}
                    </h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {/* --- ΠΡΟΣΘΗΚΗ ΛΟΓΙΚΗΣ split ΕΔΩ --- */}
                      {results.ai_advice && results.ai_advice.includes("###")
                        ? (i18n.language === 'el'
                          ? results.ai_advice.split("###")[0].trim()
                          : results.ai_advice.split("###")[1].trim())
                        : (results.ai_advice || t("aiDefault"))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App