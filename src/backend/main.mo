import Text "mo:core/Text";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

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
    favoriteFood : ?Text; // New field for favorite food
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
    favoriteFood : ?Text,
  ) : async [Dish] {
    // If no allergies, return all recipes or a limited number if there are many
    if (allergies.size() == 0) {
      let recipes = switch (favoriteFood) {
        case (null) { getLimitedRecipes(50) };
        case (?favoriteText) {
          if (favoriteText == "") {
            getLimitedRecipes(50);
          } else {
            createStarMealAndAppendToRecipes(favoriteText);
          };
        };
      };
      return recipes;
    };

    // Convert allergies to a lower-case Set for comparison
    let allergySet = Set.fromArray(
      allergies.map(func(a) { a.toLower() })
    );

    // Filter recipes for compatibility with the allergySet
    let filteredRecipes = recipeDatabase.values().filter(
      func(recipe) {
        let hasAllergy = recipe.ingredients.any(
          func(ingredient) {
            let lowerIngredient = ingredient.toLower();
            switch (allergySet.contains(lowerIngredient)) {
              case (true) { true };
              case (false) {
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

    // Limit the number of results
    let limitedFilteredRecipes = filteredRecipes.toArray().sliceToArray(0, 50);

    if (limitedFilteredRecipes.size() == 0) {
      // If no compatible recipes are found after filtering, return empty array
      [];
    } else {
      switch (favoriteFood) {
        case (null) { limitedFilteredRecipes };
        case (?favoriteText) {
          if (favoriteText == "") {
            limitedFilteredRecipes;
          } else {
            createStarMealAndAppendToFilteredRecipes(favoriteText, limitedFilteredRecipes);
          };
        };
      };
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

  func createStarMealAndAppendToRecipes(favoriteFood : Text) : [Dish] {
    let starMeal = createStarMeal(favoriteFood, "A healthy version of your favorite meal!");
    let limitedRecipes = getLimitedRecipes(50);
    if (limitedRecipes.size() == 0) {
      [starMeal];
    } else {
      limitedRecipes.concat([starMeal]);
    };
  };

  func createStarMealAndAppendToFilteredRecipes(favoriteFood : Text, filteredRecipes : [Dish]) : [Dish] {
    let starMeal = createStarMeal(favoriteFood, "A healthy version of your favorite meal!");
    filteredRecipes.concat([starMeal]);
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

  func createStarMeal(food : Text, explanation : Text) : Dish {
    {
      name = "Star Meal: " # food;
      photoReference = "https://picsum.photos/20" # food;
      healthExplanation = explanation # ". This meal is tailored to fit your dietary needs while still allowing you to enjoy " # food # ".";
      ingredients = generateIngredients(food);
      instructions = generateInstructions(food);
      nutritionSummary = calculateNutrition(food);
    };
  };

  func generateIngredients(food : Text) : [Text] {
    [
      "Main ingredient: " # food,
      "Supplemented with healthy grains",
      "Fresh veggies",
      "Low sodium seasoning",
      "Olive oil",
    ];
  };

  func generateInstructions(food : Text) : [Text] {
    [
      "Start by prepping your main ingredient: " # food,
      "Cook grains according to package instructions",
      "Chop veggies and saute them in non-stick pan",
      "Season everything after removing from heat",
      "Serve immediately for best flavor",
    ];
  };

  func calculateNutrition(food : Text) : NutritionSummary {
    {
      calories = 350;
      sodium = 100;
      protein = 25;
      carbohydrates = 45;
      fats = 15;
    };
  };
};
