import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="gap-2"
    >
      <Languages className="w-4 h-4" />
      {language === 'en' ? t('switchToSpanish') : t('switchToEnglish')}
    </Button>
  );
}
