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
  const [noHealthConditions, setNoHealthConditions] = useState(initialData.healthConditions.length === 0);
  const [allergies, setAllergies] = useState<string[]>(initialData.allergies);
  const [allergyInput, setAllergyInput] = useState('');
  const [noAllergies, setNoAllergies] = useState(initialData.allergies.length === 0);
  const [systolicBP, setSystolicBP] = useState(initialData.systolicBP);
  const [diastolicBP, setDiastolicBP] = useState(initialData.diastolicBP);
  const [favoriteFood, setFavoriteFood] = useState(initialData.favoriteFood);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: getFoodRecommendations, isPending } = useFoodRecommendations();

  const handleAddCondition = (condition?: string) => {
    const conditionToAdd = condition || conditionInput.trim();
    const normalized = conditionToAdd.toLowerCase();
    if (normalized && !healthConditions.some((c) => c.toLowerCase() === normalized)) {
      setHealthConditions([...healthConditions, conditionToAdd]);
      setConditionInput('');
      setConditionSearchTerm('');
      // Automatically uncheck "No health conditions" when adding a condition
      setNoHealthConditions(false);
    }
  };

  const handleRemoveCondition = (condition: string) => {
    const newConditions = healthConditions.filter((c) => c !== condition);
    setHealthConditions(newConditions);
    // If all conditions removed, set noHealthConditions to true
    if (newConditions.length === 0) {
      setNoHealthConditions(true);
    }
  };

  const handleNoHealthConditionsToggle = () => {
    if (!noHealthConditions) {
      // User is selecting "No health conditions" - clear all conditions
      setHealthConditions([]);
      setConditionInput('');
      setConditionSearchTerm('');
      setNoHealthConditions(true);
    } else {
      // User is deselecting "No health conditions"
      setNoHealthConditions(false);
    }
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
      healthConditions: noHealthConditions ? [] : healthConditions,
      systolicBP,
      diastolicBP,
      allergies: noAllergies ? [] : allergies,
      favoriteFood: favoriteFood.trim(),
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
        healthConditions: noHealthConditions ? [] : healthConditions,
        systolicBP: BigInt(systolicBP),
        diastolicBP: BigInt(diastolicBP),
        allergies: noAllergies ? [] : allergies,
        favoriteFood: favoriteFood.trim(),
      },
      {
        onSuccess: (recommendations) => {
          onSubmit(formData, recommendations);
        },
        onError: (error) => {
          setValidationError(`Failed to get recommendations: ${error.message}`);
        },
      }
    );
  };

  const filteredConditions = COMMON_HEALTH_CONDITIONS.filter((condition) =>
    condition.toLowerCase().includes(conditionSearchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Your Health Information
          </CardTitle>
          <CardDescription>
            Enter your health details to receive personalized food recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Age and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1"
                max="500"
              />
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <Label>Blood Pressure (mmHg)</Label>
            <div className="grid grid-cols-2 gap-4">
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
                />
              </div>
            </div>
          </div>

          {/* Health Conditions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Health Conditions</Label>
              <Button
                type="button"
                variant={noHealthConditions ? 'default' : 'outline'}
                size="sm"
                onClick={handleNoHealthConditionsToggle}
                className="text-xs"
              >
                {noHealthConditions ? '✓ ' : ''}No health conditions
              </Button>
            </div>

            {!noHealthConditions && (
              <>
                {/* Search/Add Custom Condition */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search or add custom condition..."
                      value={conditionInput}
                      onChange={(e) => {
                        setConditionInput(e.target.value);
                        setConditionSearchTerm(e.target.value);
                      }}
                      onKeyPress={handleConditionKeyPress}
                      className="pl-9"
                      disabled={noHealthConditions}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => handleAddCondition()}
                    disabled={!conditionInput.trim() || noHealthConditions}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Add Common Conditions */}
                {conditionSearchTerm && filteredConditions.length > 0 && (
                  <div className="border border-border rounded-lg p-3 bg-muted/30 max-h-48 overflow-y-auto">
                    <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
                    <div className="flex flex-wrap gap-2">
                      {filteredConditions.slice(0, 20).map((condition) => (
                        <Button
                          key={condition}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddCondition(condition)}
                          className="text-xs h-7"
                          disabled={healthConditions.some(
                            (c) => c.toLowerCase() === condition.toLowerCase()
                          )}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {condition}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Conditions */}
                {healthConditions.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/20 rounded-lg">
                    {healthConditions.map((condition) => (
                      <Badge key={condition} variant="secondary" className="gap-1 pr-1">
                        {condition}
                        <button
                          type="button"
                          onClick={() => handleRemoveCondition(condition)}
                          className="ml-1 hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Allergies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Allergies</Label>
              <Button
                type="button"
                variant={noAllergies ? 'default' : 'outline'}
                size="sm"
                onClick={handleNoAllergiesToggle}
                className="text-xs"
              >
                {noAllergies ? '✓ ' : ''}No allergies
              </Button>
            </div>

            {!noAllergies && (
              <>
                {/* Add Custom Allergy */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter allergy..."
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyPress={handleAllergyKeyPress}
                    disabled={noAllergies}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => handleAddAllergy()}
                    disabled={!allergyInput.trim() || noAllergies}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Add Common Allergies */}
                <div className="border border-border rounded-lg p-3 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Common allergies:</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_ALLERGIES.map((allergy) => (
                      <Button
                        key={allergy}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddAllergy(allergy)}
                        className="text-xs h-7"
                        disabled={allergies.some((a) => a.toLowerCase() === allergy.toLowerCase())}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {allergy}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selected Allergies */}
                {allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-destructive/10 rounded-lg">
                    {allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="gap-1 pr-1">
                        {allergy}
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(allergy)}
                          className="ml-1 hover:bg-destructive/80 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Favorite Food */}
          <div className="space-y-2">
            <Label htmlFor="favoriteFood">Favorite food (optional)</Label>
            <Input
              id="favoriteFood"
              type="text"
              placeholder="e.g., Pizza, Tacos, Sushi..."
              value={favoriteFood}
              onChange={(e) => setFavoriteFood(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              We'll create a healthy version of your favorite food as a Star Meal!
            </p>
          </div>

          {/* Validation Error */}
          {validationError && (
            <Alert variant="destructive">
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              'Search Foods'
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
