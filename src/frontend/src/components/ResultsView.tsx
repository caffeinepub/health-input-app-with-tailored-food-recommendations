import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Apple, AlertCircle, User, Activity, Heart } from 'lucide-react';
import type { FoodRecommendation } from '../backend';
import type { HealthFormData } from '../App';

interface ResultsViewProps {
  results: FoodRecommendation[];
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
          {formData.healthConditions.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                {formData.healthConditions.map((condition) => (
                  <Badge key={condition} variant="outline" className="capitalize">
                    {condition}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertDescription className="text-sm text-amber-900 dark:text-amber-200">
          <strong>Medical Disclaimer:</strong> This app provides general food suggestions and is not
          medical advice. Always consult with a healthcare professional before making significant
          dietary changes, especially if you have existing health conditions.
        </AlertDescription>
      </Alert>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Apple className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold">Recommended Foods for You</h2>
        </div>
        <p className="text-muted-foreground">
          Based on your health profile, here are {results.length} food{results.length !== 1 ? 's' : ''}{' '}
          that may support your wellness goals:
        </p>

        <div className="grid gap-4">
          {results.map((recommendation, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Apple className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{recommendation.food}</CardTitle>
                    <CardDescription className="mt-2 text-sm leading-relaxed">
                      {recommendation.explanation}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <Button onClick={onEditInputs} variant="outline" size="lg" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Try Different Inputs
        </Button>
      </div>
    </div>
  );
}
