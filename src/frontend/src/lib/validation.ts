import type { HealthFormData } from '../App';

export function validateHealthInput(data: HealthFormData): string | null {
  // Age validation
  if (!data.age || data.age.trim() === '') {
    return 'Please enter your age.';
  }
  const age = parseInt(data.age, 10);
  if (isNaN(age) || age < 1 || age > 120) {
    return 'Please enter a valid age between 1 and 120 years.';
  }

  // Weight validation
  if (!data.weight || data.weight.trim() === '') {
    return 'Please enter your weight.';
  }
  const weight = parseInt(data.weight, 10);
  if (isNaN(weight) || weight < 1 || weight > 500) {
    return 'Please enter a valid weight between 1 and 500 kg.';
  }

  // Systolic BP validation
  if (!data.systolicBP || data.systolicBP.trim() === '') {
    return 'Please enter your systolic blood pressure.';
  }
  const systolic = parseInt(data.systolicBP, 10);
  if (isNaN(systolic) || systolic < 60 || systolic > 250) {
    return 'Please enter a valid systolic blood pressure between 60 and 250 mmHg.';
  }

  // Diastolic BP validation
  if (!data.diastolicBP || data.diastolicBP.trim() === '') {
    return 'Please enter your diastolic blood pressure.';
  }
  const diastolic = parseInt(data.diastolicBP, 10);
  if (isNaN(diastolic) || diastolic < 40 || diastolic > 150) {
    return 'Please enter a valid diastolic blood pressure between 40 and 150 mmHg.';
  }

  // Logical BP validation
  if (systolic <= diastolic) {
    return 'Systolic blood pressure must be higher than diastolic blood pressure.';
  }

  return null;
}
