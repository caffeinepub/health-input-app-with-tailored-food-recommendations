import Text "mo:core/Text";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Dish = {
    name : Text;
    photoReference : Text;
    healthExplanation : Text;
    ingredients : [Text];
    instructions : [Text];
    nutritionSummary : NutritionSummary;
  };

  type NutritionSummary = {
    calories : Nat;
    sodium : Nat;
    protein : Nat;
    carbohydrates : Nat;
    fats : Nat;
  };

  type HealthInput = {
    age : Nat;
    weight : Nat;
    healthConditions : [Text];
    bloodPressure : BloodPressureCategory;
    allergies : [Text];
  };

  type BloodPressureCategory = {
    #low;
    #normal;
    #elevated;
    #high;
  };

  let recipeDatabase = Map.empty<Text, Dish>();

  public shared ({ caller }) func addRecipe(
    name : Text,
    photoReference : Text,
    healthExplanation : Text,
    ingredients : [Text],
    instructions : [Text],
    nutritionSummary : NutritionSummary,
  ) : async () {
    let dish : Dish = {
      name;
      photoReference;
      healthExplanation;
      ingredients;
      instructions;
      nutritionSummary;
    };
    recipeDatabase.add(name, dish);
  };

  public query ({ caller }) func getFoodRecommendations(
    age : Nat,
    weight : Nat,
    healthConditions : [Text],
    systolicBP : Nat,
    diastolicBP : Nat,
    allergies : [Text],
  ) : async [Dish] {
    if (allergies.size() == 0) {
      // No allergies specified, return all recipes or a limited number if there are many
      return getLimitedRecipes(50); // You can adjust this limit as needed
    };

    // Convert allergies to a lower-case Set for case-insensitive comparison
    let allergySet = Set.fromArray(
      allergies.map(func(a) { a.toLower() })
    );

    // Filter recipes that do not contain any of the specified allergens
    let filteredRecipes = recipeDatabase.values().filter(
      func(recipe) {
        // Check if any ingredient in the recipe matches the allergies (case-insensitive)
        let hasAllergy = recipe.ingredients.any(
          func(ingredient) {
            let lowerIngredient = ingredient.toLower();
            switch (allergySet.contains(lowerIngredient)) {
              case (true) { true };
              case (false) {
                // Also check if ingredient contains any allergy substring
                allergies.any(
                  func(allergy) {
                    lowerIngredient.contains(#text(allergy.toLower()));
                  }
                );
              };
            };
          }
        );
        not hasAllergy;
      }
    );

    // Limit the number of results to 50
    let limitedFilteredRecipes = filteredRecipes.toArray().sliceToArray(0, 50);

    if (limitedFilteredRecipes.size() == 0) {
      // If no recipes match after filtering, return empty array
      [];
    } else {
      limitedFilteredRecipes;
    };
  };

  func getLimitedRecipes(limit : Nat) : [Dish] {
    let allRecipes = recipeDatabase.values().toArray();
    if (allRecipes.size() <= limit) {
      allRecipes;
    } else {
      allRecipes.sliceToArray(0, limit);
    };
  };

  public query ({ caller }) func getGreyZoneIngredients() : async [Text] {
    [
      "Eggs",
      "Wheat",
      "Peanuts",
      "Tree Nuts",
      "Soy",
      "Fish",
      "Shellfish",
      "Mushrooms",
      "Strawberries",
    ];
  };
};
