import type { HealthFormData } from '../App';
import type { Language } from '../i18n/strings';

export function validateHealthInput(data: HealthFormData, language: Language = 'en'): string | null {
  const messages = {
    en: {
      ageRequired: 'Please enter your age.',
      ageInvalid: 'Please enter a valid age between 1 and 120 years.',
      weightRequired: 'Please enter your weight.',
      weightInvalid: 'Please enter a valid weight between 1 and 500 kg.',
      systolicRequired: 'Please enter your systolic blood pressure.',
      systolicInvalid: 'Please enter a valid systolic blood pressure between 60 and 250 mmHg.',
      diastolicRequired: 'Please enter your diastolic blood pressure.',
      diastolicInvalid: 'Please enter a valid diastolic blood pressure between 40 and 150 mmHg.',
      bpLogic: 'Systolic blood pressure must be higher than diastolic blood pressure.',
    },
    es: {
      ageRequired: 'Por favor ingresa tu edad.',
      ageInvalid: 'Por favor ingresa una edad válida entre 1 y 120 años.',
      weightRequired: 'Por favor ingresa tu peso.',
      weightInvalid: 'Por favor ingresa un peso válido entre 1 y 500 kg.',
      systolicRequired: 'Por favor ingresa tu presión arterial sistólica.',
      systolicInvalid: 'Por favor ingresa una presión arterial sistólica válida entre 60 y 250 mmHg.',
      diastolicRequired: 'Por favor ingresa tu presión arterial diastólica.',
      diastolicInvalid: 'Por favor ingresa una presión arterial diastólica válida entre 40 y 150 mmHg.',
      bpLogic: 'La presión arterial sistólica debe ser mayor que la diastólica.',
    },
  };

  const msg = messages[language];

  // Age validation
  if (!data.age || data.age.trim() === '') {
    return msg.ageRequired;
  }
  const age = parseInt(data.age, 10);
  if (isNaN(age) || age < 1 || age > 120) {
    return msg.ageInvalid;
  }

  // Weight validation
  if (!data.weight || data.weight.trim() === '') {
    return msg.weightRequired;
  }
  const weight = parseInt(data.weight, 10);
  if (isNaN(weight) || weight < 1 || weight > 500) {
    return msg.weightInvalid;
  }

  // Systolic BP validation
  if (!data.systolicBP || data.systolicBP.trim() === '') {
    return msg.systolicRequired;
  }
  const systolic = parseInt(data.systolicBP, 10);
  if (isNaN(systolic) || systolic < 60 || systolic > 250) {
    return msg.systolicInvalid;
  }

  // Diastolic BP validation
  if (!data.diastolicBP || data.diastolicBP.trim() === '') {
    return msg.diastolicRequired;
  }
  const diastolic = parseInt(data.diastolicBP, 10);
  if (isNaN(diastolic) || diastolic < 40 || diastolic > 150) {
    return msg.diastolicInvalid;
  }

  // Logical BP validation
  if (systolic <= diastolic) {
    return msg.bpLogic;
  }

  return null;
}
