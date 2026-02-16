import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
    const { i18n } = useTranslation()

    return (
        <div className="flex gap-2">
            <Button
                variant={i18n.language === 'el' ? 'default' : 'outline'}
                size="sm"
                onClick={() => i18n.changeLanguage('el')}
            >
                EL
            </Button>
            <Button
                variant={i18n.language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => i18n.changeLanguage('en')}
            >
                EN
            </Button>
        </div>
    )
}