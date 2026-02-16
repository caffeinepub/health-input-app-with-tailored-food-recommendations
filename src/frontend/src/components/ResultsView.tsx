import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Apple, AlertCircle, User, Activity, Heart, ChefHat } from 'lucide-react';
import { DishImage } from './DishImage';
import { formatNutritionValue } from '../lib/format';
import type { Dish } from '../backend';
import type { HealthFormData } from '../App';

interface ResultsViewProps {
  results: Dish[];
  formData: HealthFormData;
  onEditInputs: () => void;
}

export function ResultsView({ results, formData, onEditInputs }: ResultsViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onEditInputs} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Edit Inputs
      </Button>

      {/* Summary Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-xl">Your Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-semibold">{formData.age} years</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="font-semibold">{formData.weight} kg</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Blood Pressure</p>
                <p className="font-semibold">
                  {formData.systolicBP}/{formData.diastolicBP}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conditions</p>
                <p className="font-semibold">{formData.healthConditions.length || 'None'}</p>
              </div>
            </div>
          </div>
          {(formData.healthConditions.length > 0 || formData.allergies.length > 0) && (
            <>
              <Separator className="my-4" />
              <div className="space-y-3">
                {formData.healthConditions.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Health Conditions:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.healthConditions.map((condition) => (
                        <Badge key={condition} variant="outline" className="capitalize">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {formData.allergies.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Allergies:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="capitalize">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertDescription className="text-sm text-amber-900 dark:text-amber-200">
          <strong>Medical Disclaimer:</strong> This app provides general dietary guidance and is not a
          substitute for professional medical advice. Always consult with a healthcare provider or registered
          dietitian before making significant dietary changes, especially if you have medical conditions or
          take medications.
        </AlertDescription>
      </Alert>

      {/* Recommendations Header */}
      <div className="flex items-center gap-3 pt-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Apple className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Personalized Recommendations</h2>
          <p className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? 'dish' : 'dishes'} tailored to your health profile
          </p>
        </div>
      </div>

      {/* Food Recommendations */}
      {results.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No recommendations found. Try adjusting your health profile or allergies.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {results.map((dish, index) => (
            <Card key={`${dish.name}-${dish.photoReference}-${index}`} className="overflow-hidden shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <ChefHat className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{dish.name}</CardTitle>
                    <CardDescription className="mt-2 text-base leading-relaxed">
                      {dish.healthExplanation}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dish Image */}
                <DishImage photoReference={dish.photoReference} dishName={dish.name} />

                <Separator />

                {/* Ingredients */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      1
                    </span>
                    Ingredients
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8">
                    {dish.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Instructions */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      2
                    </span>
                    Cooking Instructions
                  </h3>
                  <ol className="space-y-3 pl-8">
                    {dish.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                        <span className="font-semibold text-primary shrink-0">{idx + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Separator />

                {/* Nutrition Summary */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      3
                    </span>
                    Nutrition Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-muted/30 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatNutritionValue(dish.nutritionSummary.calories)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatNutritionValue(dish.nutritionSummary.protein)}g
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatNutritionValue(dish.nutritionSummary.carbohydrates)}g
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatNutritionValue(dish.nutritionSummary.fats)}g
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Fats</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatNutritionValue(dish.nutritionSummary.sodium)}mg
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Sodium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
