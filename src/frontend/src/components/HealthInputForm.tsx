import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, X, Plus, Activity, Search } from 'lucide-react';
import { useFoodRecommendations } from '../hooks/useQueries';
import { validateHealthInput } from '../lib/validation';
import type { HealthFormData } from '../App';
import type { Dish } from '../backend';

interface HealthInputFormProps {
  initialData: HealthFormData;
  onSubmit: (data: HealthFormData, recommendations: Dish[]) => void;
}

const COMMON_ALLERGIES = [
  'Nuts',
  'Dairy',
  'Gluten',
  'Shellfish',
  'Eggs',
  'Soy',
  'Fish',
  'Peanuts',
  'Tree Nuts',
  'Wheat',
];

const COMMON_HEALTH_CONDITIONS = [
  'Diabetes',
  'Type 1 Diabetes',
  'Type 2 Diabetes',
  'Hypertension',
  'High Blood Pressure',
  'Heart Disease',
  'Coronary Artery Disease',
  'Anemia',
  'Iron Deficiency',
  'Obesity',
  'High Cholesterol',
  'Hyperlipidemia',
  'Kidney Disease',
  'Chronic Kidney Disease',
  'GERD',
  'Acid Reflux',
  'IBS',
  'Irritable Bowel Syndrome',
  'Crohn\'s Disease',
  'Ulcerative Colitis',
  'PCOS',
  'Polycystic Ovary Syndrome',
  'Asthma',
  'Celiac Disease',
  'Lactose Intolerance',
  'Osteoporosis',
  'Arthritis',
  'Rheumatoid Arthritis',
  'Osteoarthritis',
  'Thyroid Disease',
  'Hypothyroidism',
  'Hyperthyroidism',
  'Fatty Liver Disease',
  'Gout',
  'Diverticulitis',
  'Gastritis',
  'Peptic Ulcer',
  'Pancreatitis',
  'Gallstones',
  'Migraine',
  'Depression',
  'Anxiety',
  'Sleep Apnea',
  'Fibromyalgia',
  'Lupus',
  'Multiple Sclerosis',
  'Parkinson\'s Disease',
  'Alzheimer\'s Disease',
  'Stroke',
  'Cancer',
  'Prediabetes',
  'Metabolic Syndrome',
];

export function HealthInputForm({ initialData, onSubmit }: HealthInputFormProps) {
  const [age, setAge] = useState(initialData.age);
  const [weight, setWeight] = useState(initialData.weight);
  const [healthConditions, setHealthConditions] = useState<string[]>(initialData.healthConditions);
  const [conditionInput, setConditionInput] = useState('');
  const [conditionSearchTerm, setConditionSearchTerm] = useState('');
  const [allergies, setAllergies] = useState<string[]>(initialData.allergies);
  const [allergyInput, setAllergyInput] = useState('');
  const [noAllergies, setNoAllergies] = useState(initialData.allergies.length === 0);
  const [systolicBP, setSystolicBP] = useState(initialData.systolicBP);
  const [diastolicBP, setDiastolicBP] = useState(initialData.diastolicBP);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: getFoodRecommendations, isPending } = useFoodRecommendations();

  const handleAddCondition = (condition?: string) => {
    const conditionToAdd = condition || conditionInput.trim();
    const normalized = conditionToAdd.toLowerCase();
    if (normalized && !healthConditions.some((c) => c.toLowerCase() === normalized)) {
      setHealthConditions([...healthConditions, conditionToAdd]);
      setConditionInput('');
      setConditionSearchTerm('');
    }
  };

  const handleRemoveCondition = (condition: string) => {
    setHealthConditions(healthConditions.filter((c) => c !== condition));
  };

  const handleAddAllergy = (allergy?: string) => {
    const allergyToAdd = allergy || allergyInput.trim();
    const normalized = allergyToAdd.toLowerCase();
    if (normalized && !allergies.some((a) => a.toLowerCase() === normalized)) {
      setAllergies([...allergies, allergyToAdd]);
      setAllergyInput('');
      // Automatically uncheck "No allergies" when adding an allergy
      setNoAllergies(false);
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    const newAllergies = allergies.filter((a) => a !== allergy);
    setAllergies(newAllergies);
    // If all allergies removed, set noAllergies to true
    if (newAllergies.length === 0) {
      setNoAllergies(true);
    }
  };

  const handleNoAllergiesToggle = () => {
    if (!noAllergies) {
      // User is selecting "No allergies" - clear all allergies
      setAllergies([]);
      setAllergyInput('');
      setNoAllergies(true);
    } else {
      // User is deselecting "No allergies"
      setNoAllergies(false);
    }
  };

  const handleConditionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCondition();
    }
  };

  const handleAllergyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAllergy();
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
      allergies: noAllergies ? [] : allergies,
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
        allergies: noAllergies ? [] : allergies,
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

  // Filter health conditions based on search term
  const filteredConditions = COMMON_HEALTH_CONDITIONS.filter(
    (condition) =>
      condition.toLowerCase().includes(conditionSearchTerm.toLowerCase()) &&
      !healthConditions.some((c) => c.toLowerCase() === condition.toLowerCase())
  );

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
              
              {/* Search/Filter Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="condition-search"
                  type="text"
                  placeholder="Search conditions or type your own..."
                  value={conditionSearchTerm}
                  onChange={(e) => setConditionSearchTerm(e.target.value)}
                  className="h-11 pl-10"
                />
              </div>

              {/* Custom condition input */}
              <div className="flex gap-2">
                <Input
                  id="conditions"
                  type="text"
                  placeholder="Add a custom condition"
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  onKeyPress={handleConditionKeyPress}
                  className="h-11 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleAddCondition()}
                  disabled={!conditionInput.trim()}
                  className="h-11 w-11 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Filtered common conditions */}
              {conditionSearchTerm && filteredConditions.length > 0 && (
                <div className="max-h-48 overflow-y-auto border border-border rounded-lg p-2 space-y-1">
                  {filteredConditions.slice(0, 10).map((condition) => (
                    <Button
                      key={condition}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddCondition(condition)}
                      className="w-full justify-start h-9 text-sm font-normal"
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      {condition}
                    </Button>
                  ))}
                </div>
              )}

              {/* Quick-add common conditions (when not searching) */}
              {!conditionSearchTerm && (
                <div className="flex flex-wrap gap-2">
                  {COMMON_HEALTH_CONDITIONS.slice(0, 12).map((condition) => {
                    const isSelected = healthConditions.some(
                      (c) => c.toLowerCase() === condition.toLowerCase()
                    );
                    if (isSelected) return null;
                    return (
                      <Button
                        key={condition}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddCondition(condition)}
                        className="h-8 text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {condition}
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Selected conditions */}
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
            </div>

            {/* Allergies */}
            <div className="space-y-3">
              <Label htmlFor="allergies" className="text-sm font-medium">
                Allergies
              </Label>

              {/* No Allergies Toggle */}
              <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-muted/30">
                <Button
                  type="button"
                  variant={noAllergies ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleNoAllergiesToggle}
                  className="h-9"
                >
                  {noAllergies ? '✓ No allergies' : 'No allergies'}
                </Button>
                <span className="text-xs text-muted-foreground">
                  Select if you have no food allergies
                </span>
              </div>

              {/* Allergy input (disabled when "No allergies" is selected) */}
              <div className="flex gap-2">
                <Input
                  id="allergies"
                  type="text"
                  placeholder="Type an allergy or select from common ones below"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyPress={handleAllergyKeyPress}
                  disabled={noAllergies}
                  className="h-11 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleAddAllergy()}
                  disabled={!allergyInput.trim() || noAllergies}
                  className="h-11 w-11 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Common allergies quick-add */}
              <div className="flex flex-wrap gap-2">
                {COMMON_ALLERGIES.map((allergy) => {
                  const isSelected = allergies.some((a) => a.toLowerCase() === allergy.toLowerCase());
                  return (
                    <Button
                      key={allergy}
                      type="button"
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        if (isSelected) {
                          handleRemoveAllergy(allergies.find((a) => a.toLowerCase() === allergy.toLowerCase())!);
                        } else {
                          handleAddAllergy(allergy);
                        }
                      }}
                      disabled={noAllergies}
                      className="h-8 text-xs"
                    >
                      {allergy}
                    </Button>
                  );
                })}
              </div>

              {/* Selected allergies */}
              {allergies.length > 0 && !noAllergies && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {allergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant="secondary"
                      className="pl-3 pr-2 py-1.5 text-sm capitalize"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(allergy)}
                        className="ml-2 hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
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
