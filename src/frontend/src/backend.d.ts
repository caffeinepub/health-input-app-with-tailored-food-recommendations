import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Dish {
    name: string;
    instructions: Array<string>;
    nutritionSummary: NutritionSummary;
    photoReference: string;
    healthExplanation: string;
    ingredients: Array<string>;
}
export interface NutritionSummary {
    carbohydrates: bigint;
    sodium: bigint;
    fats: bigint;
    calories: bigint;
    protein: bigint;
}
export interface backendInterface {
    addRecipe(name: string, photoReference: string, healthExplanation: string, ingredients: Array<string>, instructions: Array<string>, nutritionSummary: NutritionSummary): Promise<void>;
    getFoodRecommendations(age: bigint, weight: bigint, healthConditions: Array<string>, systolicBP: bigint, diastolicBP: bigint, allergies: Array<string>, favoriteFood: string | null): Promise<Array<Dish>>;
    getGreyZoneIngredients(): Promise<Array<string>>;
}
