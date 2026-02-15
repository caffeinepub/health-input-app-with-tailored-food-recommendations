import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, X, Plus, Activity } from 'lucide-react';
import { useFoodRecommendations } from '../hooks/useQueries';
import { validateHealthInput } from '../lib/validation';
import type { HealthFormData } from '../App';
import type { FoodRecommendation } from '../backend';

interface HealthInputFormProps {
  initialData: HealthFormData;
  onSubmit: (data: HealthFormData, recommendations: FoodRecommendation[]) => void;
}

export function HealthInputForm({ initialData, onSubmit }: HealthInputFormProps) {
  const [age, setAge] = useState(initialData.age);
  const [weight, setWeight] = useState(initialData.weight);
  const [healthConditions, setHealthConditions] = useState<string[]>(initialData.healthConditions);
  const [conditionInput, setConditionInput] = useState('');
  const [systolicBP, setSystolicBP] = useState(initialData.systolicBP);
  const [diastolicBP, setDiastolicBP] = useState(initialData.diastolicBP);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: getFoodRecommendations, isPending } = useFoodRecommendations();

  const handleAddCondition = () => {
    const trimmed = conditionInput.trim().toLowerCase();
    if (trimmed && !healthConditions.includes(trimmed)) {
      setHealthConditions([...healthConditions, trimmed]);
      setConditionInput('');
    }
  };

  const handleRemoveCondition = (condition: string) => {
    setHealthConditions(healthConditions.filter((c) => c !== condition));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCondition();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const formData: HealthFormData = {
      age,
      weight,
      healthConditions,
      systolicBP,
      diastolicBP,
    };

    const error = validateHealthInput(formData);
    if (error) {
      setValidationError(error);
      return;
    }

    getFoodRecommendations(
      {
        age: BigInt(age),
        weight: BigInt(weight),
        healthConditions,
        systolicBP: BigInt(systolicBP),
        diastolicBP: BigInt(diastolicBP),
      },
      {
        onSuccess: (recommendations) => {
          onSubmit(formData, recommendations);
        },
        onError: (error) => {
          setValidationError(error instanceof Error ? error.message : 'Failed to get recommendations');
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-border/50">
        <CardHeader className="space-y-2 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Your Health Profile</CardTitle>
              <CardDescription>
                Tell us about your health so we can recommend the best foods for you
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age and Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                  max="500"
                  className="h-11"
                />
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Blood Pressure (mmHg)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolic" className="text-xs text-muted-foreground">
                    Systolic (top number)
                  </Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="e.g., 120"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(e.target.value)}
                    min="60"
                    max="250"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic" className="text-xs text-muted-foreground">
                    Diastolic (bottom number)
                  </Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="e.g., 80"
                    value={diastolicBP}
                    onChange={(e) => setDiastolicBP(e.target.value)}
                    min="40"
                    max="150"
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Health Conditions */}
            <div className="space-y-3">
              <Label htmlFor="conditions" className="text-sm font-medium">
                Health Conditions
              </Label>
              <div className="flex gap-2">
                <Input
                  id="conditions"
                  type="text"
                  placeholder="e.g., diabetes, hypertension, anemia"
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-11 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddCondition}
                  disabled={!conditionInput.trim()}
                  className="h-11 w-11 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {healthConditions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {healthConditions.map((condition) => (
                    <Badge
                      key={condition}
                      variant="secondary"
                      className="pl-3 pr-2 py-1.5 text-sm capitalize"
                    >
                      {condition}
                      <button
                        type="button"
                        onClick={() => handleRemoveCondition(condition)}
                        className="ml-2 hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Common conditions: diabetes, heart disease, hypertension, anemia, osteoporosis
              </p>
            </div>

            {/* Validation Error */}
            {validationError && (
              <Alert variant="destructive">
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full h-12 text-base font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Search Foods'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
