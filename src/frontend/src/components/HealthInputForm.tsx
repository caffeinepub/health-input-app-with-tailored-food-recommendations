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
import { useI18n } from '../hooks/useI18n';
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
  const { t, language } = useI18n();
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
      setNoHealthConditions(false);
    }
  };

  const handleRemoveCondition = (condition: string) => {
    const newConditions = healthConditions.filter((c) => c !== condition);
    setHealthConditions(newConditions);
    if (newConditions.length === 0) {
      setNoHealthConditions(true);
    }
  };

  const handleNoHealthConditionsToggle = () => {
    if (!noHealthConditions) {
      setHealthConditions([]);
      setConditionInput('');
      setConditionSearchTerm('');
      setNoHealthConditions(true);
    } else {
      setNoHealthConditions(false);
    }
  };

  const handleAddAllergy = (allergy?: string) => {
    const allergyToAdd = allergy || allergyInput.trim();
    const normalized = allergyToAdd.toLowerCase();
    if (normalized && !allergies.some((a) => a.toLowerCase() === normalized)) {
      setAllergies([...allergies, allergyToAdd]);
      setAllergyInput('');
      setNoAllergies(false);
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    const newAllergies = allergies.filter((a) => a !== allergy);
    setAllergies(newAllergies);
    if (newAllergies.length === 0) {
      setNoAllergies(true);
    }
  };

  const handleNoAllergiesToggle = () => {
    if (!noAllergies) {
      setAllergies([]);
      setAllergyInput('');
      setNoAllergies(true);
    } else {
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

    const error = validateHealthInput(formData, language);
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
            {t('healthInfoTitle')}
          </CardTitle>
          <CardDescription>
            {t('healthInfoDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Age and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">{t('ageLabel')}</Label>
              <Input
                id="age"
                type="number"
                placeholder={t('agePlaceholder')}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{t('weightLabel')}</Label>
              <Input
                id="weight"
                type="number"
                placeholder={t('weightPlaceholder')}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1"
                max="500"
              />
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <Label>{t('bloodPressureLabel')}</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic" className="text-xs text-muted-foreground">
                  {t('systolicLabel')}
                </Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder={t('systolicPlaceholder')}
                  value={systolicBP}
                  onChange={(e) => setSystolicBP(e.target.value)}
                  min="60"
                  max="250"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic" className="text-xs text-muted-foreground">
                  {t('diastolicLabel')}
                </Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder={t('diastolicPlaceholder')}
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
              <Label>{t('healthConditionsLabel')}</Label>
              <Button
                type="button"
                variant={noHealthConditions ? 'default' : 'outline'}
                size="sm"
                onClick={handleNoHealthConditionsToggle}
                className="text-xs"
              >
                {noHealthConditions ? '✓ ' : ''}{t('noHealthConditions')}
              </Button>
            </div>

            {!noHealthConditions && (
              <>
                {/* Search/Add Custom Condition */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={t('searchConditionsPlaceholder')}
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
                  <div className="border rounded-lg p-3 bg-muted/30 max-h-48 overflow-y-auto">
                    <p className="text-xs text-muted-foreground mb-2">{t('quickAddLabel')}</p>
                    <div className="flex flex-wrap gap-2">
                      {filteredConditions.slice(0, 20).map((condition) => (
                        <Badge
                          key={condition}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => handleAddCondition(condition)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Conditions */}
                {healthConditions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {healthConditions.map((condition) => (
                      <Badge key={condition} variant="default" className="gap-1">
                        {condition}
                        <button
                          type="button"
                          onClick={() => handleRemoveCondition(condition)}
                          className="ml-1 hover:text-destructive"
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
              <Label>{t('allergiesLabel')}</Label>
              <Button
                type="button"
                variant={noAllergies ? 'default' : 'outline'}
                size="sm"
                onClick={handleNoAllergiesToggle}
                className="text-xs"
              >
                {noAllergies ? '✓ ' : ''}{t('noAllergies')}
              </Button>
            </div>

            {!noAllergies && (
              <>
                {/* Search/Add Custom Allergy */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={t('searchAllergiesPlaceholder')}
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      onKeyPress={handleAllergyKeyPress}
                      className="pl-9"
                      disabled={noAllergies}
                    />
                  </div>
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
                <div className="border rounded-lg p-3 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">{t('quickAddLabel')}</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_ALLERGIES.map((allergy) => (
                      <Badge
                        key={allergy}
                        variant="outline"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => handleAddAllergy(allergy)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Selected Allergies */}
                {allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="gap-1">
                        {allergy}
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(allergy)}
                          className="ml-1 hover:text-destructive-foreground/70"
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
            <Label htmlFor="favoriteFood">{t('favoriteFoodLabel')}</Label>
            <Input
              id="favoriteFood"
              type="text"
              placeholder={t('favoriteFoodPlaceholder')}
              value={favoriteFood}
              onChange={(e) => setFavoriteFood(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t('favoriteFoodHelper')}
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
                {t('searchFoodsButton')}...
              </>
            ) : (
              t('searchFoodsButton')
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
