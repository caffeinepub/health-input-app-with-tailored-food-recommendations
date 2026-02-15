import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FoodRecommendation {
    food: string;
    explanation: string;
}
export interface backendInterface {
    getFoodRecommendations(age: bigint, weight: bigint, healthConditions: Array<string>, systolicBP: bigint, diastolicBP: bigint): Promise<Array<FoodRecommendation>>;
}
