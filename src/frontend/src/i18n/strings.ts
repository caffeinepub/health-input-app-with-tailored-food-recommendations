export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Header
    appName: 'Barrera Healthy Eats',
    tagline: 'Personalized nutrition guidance',
    
    // Hero Section
    heroTitle: 'Discover Foods That Support Your Health',
    heroDescription: 'Enter your health information and get personalized food recommendations tailored to your needs.',
    
    // Health Input Form
    healthInfoTitle: 'Your Health Information',
    healthInfoDescription: 'Enter your health details to receive personalized food recommendations',
    ageLabel: 'Age (years)',
    agePlaceholder: 'e.g., 30',
    weightLabel: 'Weight (kg)',
    weightPlaceholder: 'e.g., 70',
    bloodPressureLabel: 'Blood Pressure (mmHg)',
    systolicLabel: 'Systolic (top number)',
    systolicPlaceholder: 'e.g., 120',
    diastolicLabel: 'Diastolic (bottom number)',
    diastolicPlaceholder: 'e.g., 80',
    healthConditionsLabel: 'Health Conditions',
    noHealthConditions: 'No health conditions',
    searchConditionsPlaceholder: 'Search or add custom condition...',
    quickAddLabel: 'Quick add:',
    allergiesLabel: 'Allergies',
    noAllergies: 'No allergies',
    searchAllergiesPlaceholder: 'Search or add custom allergy...',
    favoriteFoodLabel: 'Favorite Food (Optional)',
    favoriteFoodPlaceholder: 'e.g., Pizza, Tacos, Sushi...',
    favoriteFoodHelper: 'We\'ll try to include a healthy version of your favorite!',
    searchFoodsButton: 'Search Foods',
    
    // Results View
    editInputsButton: 'Edit Inputs',
    healthSummaryTitle: 'Your Health Summary',
    ageUnit: 'years',
    weightUnit: 'kg',
    bloodPressure: 'Blood Pressure',
    conditions: 'Conditions',
    none: 'None',
    healthConditionsColon: 'Health Conditions:',
    allergiesColon: 'Allergies:',
    favoriteFoodColon: 'Favorite Food:',
    disclaimerTitle: 'Medical Disclaimer:',
    disclaimerText: 'This app provides general dietary guidance and is not a substitute for professional medical advice. Always consult with a healthcare provider or registered dietitian before making significant dietary changes, especially if you have medical conditions or take medications.',
    recommendationsTitle: 'Your Personalized Recommendations',
    dishSingular: 'dish',
    dishPlural: 'dishes',
    tailoredText: 'tailored to your health profile',
    noRecommendations: 'No recommendations found. Try adjusting your health profile or allergies.',
    starMealBadge: 'Star Meal',
    ingredientsTitle: 'Ingredients',
    instructionsTitle: 'Cooking Instructions',
    nutritionTitle: 'Nutrition Summary',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fats: 'Fats',
    sodium: 'Sodium',
    
    // Soundtrack Controls
    playMusic: 'Play music',
    pauseMusic: 'Pause music',
    volumeControls: 'Volume controls',
    volume: 'Volume',
    mute: 'Mute',
    unmute: 'Unmute',
    muted: 'Muted',
    audioLoadError: 'Unable to load audio file. Please check your connection.',
    audioPlayError: 'Unable to play audio. Your browser may have blocked autoplay.',
    
    // Validation Messages
    validationAgeRequired: 'Please enter your age.',
    validationAgeInvalid: 'Please enter a valid age between 1 and 120 years.',
    validationWeightRequired: 'Please enter your weight.',
    validationWeightInvalid: 'Please enter a valid weight between 1 and 500 kg.',
    validationSystolicRequired: 'Please enter your systolic blood pressure.',
    validationSystolicInvalid: 'Please enter a valid systolic blood pressure between 60 and 250 mmHg.',
    validationDiastolicRequired: 'Please enter your diastolic blood pressure.',
    validationDiastolicInvalid: 'Please enter a valid diastolic blood pressure between 40 and 150 mmHg.',
    validationBPLogic: 'Systolic blood pressure must be higher than diastolic blood pressure.',
    
    // Language Toggle
    switchToSpanish: 'Cambiar A Español',
    switchToEnglish: 'Switch to English',
    
    // Footer
    builtWith: 'Built with',
    using: 'using',
  },
  es: {
    // Header
    appName: 'Barrera Healthy Eats',
    tagline: 'Orientación nutricional personalizada',
    
    // Hero Section
    heroTitle: 'Descubre Alimentos Que Apoyan Tu Salud',
    heroDescription: 'Ingresa tu información de salud y obtén recomendaciones de alimentos personalizadas según tus necesidades.',
    
    // Health Input Form
    healthInfoTitle: 'Tu Información de Salud',
    healthInfoDescription: 'Ingresa tus datos de salud para recibir recomendaciones de alimentos personalizadas',
    ageLabel: 'Edad (años)',
    agePlaceholder: 'ej., 30',
    weightLabel: 'Peso (kg)',
    weightPlaceholder: 'ej., 70',
    bloodPressureLabel: 'Presión Arterial (mmHg)',
    systolicLabel: 'Sistólica (número superior)',
    systolicPlaceholder: 'ej., 120',
    diastolicLabel: 'Diastólica (número inferior)',
    diastolicPlaceholder: 'ej., 80',
    healthConditionsLabel: 'Condiciones de Salud',
    noHealthConditions: 'Sin condiciones de salud',
    searchConditionsPlaceholder: 'Buscar o agregar condición personalizada...',
    quickAddLabel: 'Agregar rápido:',
    allergiesLabel: 'Alergias',
    noAllergies: 'Sin alergias',
    searchAllergiesPlaceholder: 'Buscar o agregar alergia personalizada...',
    favoriteFoodLabel: 'Comida Favorita (Opcional)',
    favoriteFoodPlaceholder: 'ej., Pizza, Tacos, Sushi...',
    favoriteFoodHelper: '¡Intentaremos incluir una versión saludable de tu favorita!',
    searchFoodsButton: 'Buscar Alimentos',
    
    // Results View
    editInputsButton: 'Editar Datos',
    healthSummaryTitle: 'Tu Resumen de Salud',
    ageUnit: 'años',
    weightUnit: 'kg',
    bloodPressure: 'Presión Arterial',
    conditions: 'Condiciones',
    none: 'Ninguna',
    healthConditionsColon: 'Condiciones de Salud:',
    allergiesColon: 'Alergias:',
    favoriteFoodColon: 'Comida Favorita:',
    disclaimerTitle: 'Aviso Médico:',
    disclaimerText: 'Esta aplicación proporciona orientación dietética general y no sustituye el consejo médico profesional. Siempre consulte con un proveedor de atención médica o dietista registrado antes de hacer cambios dietéticos significativos, especialmente si tiene condiciones médicas o toma medicamentos.',
    recommendationsTitle: 'Tus Recomendaciones Personalizadas',
    dishSingular: 'plato',
    dishPlural: 'platos',
    tailoredText: 'adaptados a tu perfil de salud',
    noRecommendations: 'No se encontraron recomendaciones. Intenta ajustar tu perfil de salud o alergias.',
    starMealBadge: 'Plato Estrella',
    ingredientsTitle: 'Ingredientes',
    instructionsTitle: 'Instrucciones de Cocina',
    nutritionTitle: 'Resumen Nutricional',
    calories: 'Calorías',
    protein: 'Proteína',
    carbs: 'Carbohidratos',
    fats: 'Grasas',
    sodium: 'Sodio',
    
    // Soundtrack Controls
    playMusic: 'Reproducir música',
    pauseMusic: 'Pausar música',
    volumeControls: 'Controles de volumen',
    volume: 'Volumen',
    mute: 'Silenciar',
    unmute: 'Activar sonido',
    muted: 'Silenciado',
    audioLoadError: 'No se puede cargar el archivo de audio. Por favor verifica tu conexión.',
    audioPlayError: 'No se puede reproducir el audio. Tu navegador puede haber bloqueado la reproducción automática.',
    
    // Validation Messages
    validationAgeRequired: 'Por favor ingresa tu edad.',
    validationAgeInvalid: 'Por favor ingresa una edad válida entre 1 y 120 años.',
    validationWeightRequired: 'Por favor ingresa tu peso.',
    validationWeightInvalid: 'Por favor ingresa un peso válido entre 1 y 500 kg.',
    validationSystolicRequired: 'Por favor ingresa tu presión arterial sistólica.',
    validationSystolicInvalid: 'Por favor ingresa una presión arterial sistólica válida entre 60 y 250 mmHg.',
    validationDiastolicRequired: 'Por favor ingresa tu presión arterial diastólica.',
    validationDiastolicInvalid: 'Por favor ingresa una presión arterial diastólica válida entre 40 y 150 mmHg.',
    validationBPLogic: 'La presión arterial sistólica debe ser mayor que la diastólica.',
    
    // Language Toggle
    switchToSpanish: 'Cambiar A Español',
    switchToEnglish: 'Cambiar A Inglés',
    
    // Footer
    builtWith: 'Hecho con',
    using: 'usando',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
