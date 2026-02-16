/**
 * Format nutrition values (bigint) to readable strings
 */
export function formatNutritionValue(value: bigint): string {
  try {
    return value.toString();
  } catch {
    return '0';
  }
}
