import { useState } from 'react';
import { HealthInputForm } from './components/HealthInputForm';
import { ResultsView } from './components/ResultsView';
import { SoundtrackControls } from './components/SoundtrackControls';
import type { Dish } from './backend';
import { Heart } from 'lucide-react';
import { SiX, SiFacebook, SiLinkedin } from 'react-icons/si';

export type HealthFormData = {
  age: string;
  weight: string;
  healthConditions: string[];
  systolicBP: string;
  diastolicBP: string;
  allergies: string[];
};

function App() {
  const [formData, setFormData] = useState<HealthFormData>({
    age: '',
    weight: '',
    healthConditions: [],
    systolicBP: '',
    diastolicBP: '',
    allergies: [],
  });
  const [results, setResults] = useState<Dish[] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: HealthFormData, recommendations: Dish[]) => {
    setFormData(data);
    setResults(recommendations);
    setShowResults(true);
  };

  const handleEditInputs = () => {
    setShowResults(false);
  };

  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'barrera-healthy-eats'
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Barrera Healthy Eats</h1>
                <p className="text-xs text-muted-foreground">Personalized nutrition guidance</p>
              </div>
            </div>
            <SoundtrackControls />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showResults && (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          {/* Tiger Decorations */}
          <img
            src="/assets/generated/tiger-decal-left.dim_256x256.png"
            alt=""
            className="absolute left-0 top-0 w-32 h-32 md:w-40 md:h-40 opacity-20 pointer-events-none"
            aria-hidden="true"
          />
          <img
            src="/assets/generated/tiger-decal-right.dim_256x256.png"
            alt=""
            className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 opacity-20 pointer-events-none"
            aria-hidden="true"
          />
          
          <div className="container mx-auto px-4 py-12 md:py-16 relative z-[1]">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Discover Foods That Support Your Health
                </h2>
                <p className="text-lg text-muted-foreground">
                  Enter your health information and get personalized food recommendations tailored to your needs.
                </p>
              </div>
              <div className="relative aspect-[7/3] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/assets/generated/healthy-foods-hero.dim_1400x600.png"
                  alt="Healthy foods illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {!showResults ? (
          <HealthInputForm initialData={formData} onSubmit={handleFormSubmit} />
        ) : (
          <ResultsView
            results={results || []}
            formData={formData}
            onEditInputs={handleEditInputs}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} Barrera Healthy Eats</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1.5">
                Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
