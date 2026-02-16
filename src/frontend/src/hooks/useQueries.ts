import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Dish } from '../backend';

interface GetFoodRecommendationsParams {
  age: bigint;
  weight: bigint;
  healthConditions: string[];
  systolicBP: bigint;
  diastolicBP: bigint;
  allergies: string[];
  favoriteFood: string;
}

export function useFoodRecommendations() {
  const { actor } = useActor();

  return useMutation<Dish[], Error, GetFoodRecommendationsParams>({
    mutationFn: async (params) => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      return actor.getFoodRecommendations(
        params.age,
        params.weight,
        params.healthConditions,
        params.systolicBP,
        params.diastolicBP,
        params.allergies,
        params.favoriteFood || null
      );
    },
  });
}
