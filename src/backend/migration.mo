import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
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

  type OldActor = {
    recipeDatabase : Map.Map<Text, Dish>;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    let recipeDatabase = if (old.recipeDatabase.size() == 0) {
      initializeRecipes();
    } else {
      old.recipeDatabase;
    };
    { recipeDatabase };
  };

  func initializeRecipes() : Map.Map<Text, Dish> {
    let recipes = [
      defaultSalad(),
      chickenStirFry(),
      oatPancakes(),
      veganChili(),
      tunaPokeBowl(),
      turkeyMeatballs(),
      blackBeanSoup(),
      salmonWithQuinoa(),
      lentilCurry(),
      shrimpStirFry(),
      grilledChickenSalad(),
      mushroomRisotto(),
      chickpeaStew(),
      beefBroccoliStirFry(),
      tofuStirFry(),
      eggFriedBrownRice(),
      salmonVeggieBowl(),
      quinoaTabbouleh(),
      turkeyVegetableSoup(),
      stuffedPeppers(),
      sweetPotatoChili(),
      cauliVeggieStirFry(),
    ];

    Map.fromArray<Text, Dish>(
      recipes.map(func(dish) { (dish.name, dish) })
    );
  };

  func defaultSalad() : Dish {
    {
      name = "Default Salad";
      photoReference = "https://shorturl.at/cmHKT";
      healthExplanation = "Low in sodium and healthy.";
      ingredients = [
        "Lettuce",
        "Tomato",
        "Cucumber",
        "Vinaigrette",
      ];
      instructions = [
        "Wash and chop vegetables.",
        "Mix with vinaigrette.",
      ];
      nutritionSummary = {
        calories = 120;
        sodium = 200;
        protein = 3;
        carbohydrates = 10;
        fats = 7;
      };
    };
  };

  func chickenStirFry() : Dish {
    {
      name = "Chicken Stir Fry";
      photoReference = "https://shorturl.at/qCJS1";
      healthExplanation = "High in protein and low sodium.";
      ingredients = [
        "Chicken",
        "Broccoli",
        "Carrot",
        "Low sodium soy sauce",
        "Brown rice",
      ];
      instructions = [
        "Sauté chicken and vegetables.",
        "Serve with brown rice.",
      ];
      nutritionSummary = {
        calories = 400;
        sodium = 300;
        protein = 29;
        carbohydrates = 36;
        fats = 9;
      };
    };
  };

  func oatPancakes() : Dish {
    {
      name = "Oat Pancakes";
      photoReference = "https://shorturl.at/FHJU2";
      healthExplanation = "Good for breakfast.";
      ingredients = [
        "Oats",
        "Eggs",
        "Banana",
        "Milk",
      ];
      instructions = [
        "Blend oats, eggs, banana, and milk.",
        "Cook on griddle.",
      ];
      nutritionSummary = {
        calories = 210;
        sodium = 180;
        protein = 7;
        carbohydrates = 33;
        fats = 6;
      };
    };
  };

  func veganChili() : Dish {
    {
      name = "Vegan Chili";
      photoReference = "https://shorturl.at/lwAU4";
      healthExplanation = "High fiber, low cholesterol.";
      ingredients = [
        "Beans",
        "Tomatoes",
        "Onion",
        "Bell pepper",
        "Spices",
      ];
      instructions = [
        "Soak beans and cook with vegetables and spices.",
        "Simmer for 30 minutes.",
      ];
      nutritionSummary = {
        calories = 270;
        sodium = 140;
        protein = 14;
        carbohydrates = 44;
        fats = 2;
      };
    };
  };

  func tunaPokeBowl() : Dish {
    {
      name = "Tuna Poke Bowl";
      photoReference = "https://shorturl.at/aGHV3";
      healthExplanation = "Rich in omega-3, low in carbs.";
      ingredients = [
        "Tuna",
        "Avocado",
        "Carrot",
        "Brown rice",
        "Soy sauce",
      ];
      instructions = [
        "Assemble fish, vegetables, and rice in bowl.",
        "Drizzle with soy sauce.",
      ];
      nutritionSummary = {
        calories = 390;
        sodium = 230;
        protein = 34;
        carbohydrates = 31;
        fats = 11;
      };
    };
  };

  func turkeyMeatballs() : Dish {
    {
      name = "Turkey Meatballs";
      photoReference = "https://shorturl.at/knpY0";
      healthExplanation = "Lean protein and complex carbs.";
      ingredients = [
        "Ground turkey",
        "Oats",
        "Eggs",
        "Tomato sauce",
        "Brown rice",
      ];
      instructions = [
        "Mix turkey and oats, form meatballs. Bake.",
        "Serve with tomato sauce and brown rice.",
      ];
      nutritionSummary = {
        calories = 420;
        sodium = 330;
        protein = 36;
        carbohydrates = 38;
        fats = 10;
      };
    };
  };

  func blackBeanSoup() : Dish {
    {
      name = "Black Bean Soup";
      photoReference = "https://shorturl.at/euV38";
      healthExplanation = "High fiber and vitamin C.";
      ingredients = [
        "Black beans",
        "Tomato",
        "Onion",
        "Carrot",
        "Spices",
      ];
      instructions = [
        "Soak beans, cook with vegetables and spices. Puree.",
        "Simmer for 20 minutes.",
      ];
      nutritionSummary = {
        calories = 250;
        sodium = 170;
        protein = 15;
        carbohydrates = 42;
        fats = 3;
      };
    };
  };

  func salmonWithQuinoa() : Dish {
    {
      name = "Salmon with Quinoa";
      photoReference = "https://shorturl.at/emvHQ";
      healthExplanation = "Low sodium and gluten-free.";
      ingredients = [
        "Salmon",
        "Quinoa",
        "Broccoli",
        "Carrot",
        "Lemon",
      ];
      instructions = [
        "Bake salmon. Steam vegetables and cook quinoa.",
        "Serve with lemon.",
      ];
      nutritionSummary = {
        calories = 370;
        sodium = 320;
        protein = 33;
        carbohydrates = 26;
        fats = 13;
      };
    };
  };

  func lentilCurry() : Dish {
    {
      name = "Lentil Curry";
      photoReference = "https://shorturl.at/fvyJ2";
      healthExplanation = "High fiber and gluten-free.";
      ingredients = [
        "Lentils",
        "Tomato",
        "Onion",
        "Spinach",
        "Spices",
      ];
      instructions = [
        "Soak lentils, cook with vegetables and spices.",
        "Simmer for 30 minutes.",
      ];
      nutritionSummary = {
        calories = 280;
        sodium = 160;
        protein = 15;
        carbohydrates = 45;
        fats = 3;
      };
    };
  };

  func shrimpStirFry() : Dish {
    {
      name = "Shrimp Stir Fry";
      photoReference = "https://shorturl.at/gj463";
      healthExplanation = "Low carb, high in nutrients.";
      ingredients = [
        "Shrimp",
        "Broccoli",
        "Carrot",
        "Brown rice",
        "Soy sauce",
      ];
      instructions = [
        "Sauté shrimp and vegetables. Serve with rice.",
        "Drizzle with soy sauce.",
      ];
      nutritionSummary = {
        calories = 370;
        sodium = 310;
        protein = 29;
        carbohydrates = 41;
        fats = 7;
      };
    };
  };

  func grilledChickenSalad() : Dish {
    {
      name = "Grilled Chicken Salad";
      photoReference = "https://example.com/grilled-chicken-salad";
      healthExplanation = "Lean protein and healthy fats.";
      ingredients = [
        "Chicken breast",
        "Mixed greens",
        "Avocado",
        "Olive oil",
        "Lemon",
      ];
      instructions = [
        "Grill chicken. Toss greens with avocado and dressing.",
        "Serve with sliced chicken.",
      ];
      nutritionSummary = {
        calories = 350;
        sodium = 300;
        protein = 28;
        carbohydrates = 12;
        fats = 16;
      };
    };
  };

  func mushroomRisotto() : Dish {
    {
      name = "Mushroom Risotto";
      photoReference = "https://example.com/mushroom-risotto";
      healthExplanation = "Gluten-free and low sodium.";
      ingredients = [
        "Arborio rice",
        "Mushrooms",
        "Onion",
        "Parmesan",
        "Broth",
      ];
      instructions = [
        "Sauté mushrooms and onion. Cook rice with broth.",
        "Stir in cheese at the end.",
      ];
      nutritionSummary = {
        calories = 380;
        sodium = 280;
        protein = 9;
        carbohydrates = 65;
        fats = 9;
      };
    };
  };

  func chickpeaStew() : Dish {
    {
      name = "Chickpea Stew";
      photoReference = "https://example.com/chickpea-stew";
      healthExplanation = "High protein and gluten-free.";
      ingredients = [
        "Chickpeas",
        "Tomato",
        "Spinach",
        "Carrot",
        "Spices",
      ];
      instructions = [
        "Soak chickpeas. Cook with vegetables and spices.",
        "Simmer for 40 minutes.",
      ];
      nutritionSummary = {
        calories = 330;
        sodium = 240;
        protein = 23;
        carbohydrates = 49;
        fats = 4;
      };
    };
  };

  func beefBroccoliStirFry() : Dish {
    {
      name = "Beef Broccoli Stir Fry";
      photoReference = "https://example.com/beef-broccoli";
      healthExplanation = "Low sodium option.";
      ingredients = [
        "Beef strips",
        "Broccoli",
        "Carrot",
        "Low sodium soy sauce",
        "Brown rice",
      ];
      instructions = [
        "Sauté beef and vegetables. Serve with rice.",
        "Add sauce at the end.",
      ];
      nutritionSummary = {
        calories = 390;
        sodium = 310;
        protein = 37;
        carbohydrates = 38;
        fats = 11;
      };
    };
  };

  func tofuStirFry() : Dish {
    {
      name = "Tofu Stir Fry";
      photoReference = "https://example.com/tofu-stir-fry";
      healthExplanation = "Gluten-free and high fiber.";
      ingredients = [
        "Tofu",
        "Broccoli",
        "Bell pepper",
        "Soy sauce",
        "Rice",
      ];
      instructions = [
        "Sauté tofu and vegetables. Serve with rice.",
        "Add sauce at the end.",
      ];
      nutritionSummary = {
        calories = 320;
        sodium = 280;
        protein = 22;
        carbohydrates = 33;
        fats = 8;
      };
    };
  };

  func eggFriedBrownRice() : Dish {
    {
      name = "Egg Fried Brown Rice";
      photoReference = "https://example.com/egg-fried-rice";
      healthExplanation = "Low sodium version.";
      ingredients = [
        "Brown rice",
        "Eggs",
        "Peas",
        "Carrots",
        "Soy sauce",
      ];
      instructions = [
        "Cook rice and vegetables. Add eggs.",
        "Stir in sauce.",
      ];
      nutritionSummary = {
        calories = 340;
        sodium = 240;
        protein = 12;
        carbohydrates = 52;
        fats = 7;
      };
    };
  };

  func salmonVeggieBowl() : Dish {
    {
      name = "Salmon Veggie Bowl";
      photoReference = "https://example.com/salmon-bowl";
      healthExplanation = "Low sodium and gluten-free.";
      ingredients = [
        "Salmon",
        "Quinoa",
        "Broccoli",
        "Carrots",
        "Lemon",
      ];
      instructions = [
        "Bake salmon. Cook quinoa.",
        "Serve with vegetables and lemon.",
      ];
      nutritionSummary = {
        calories = 380;
        sodium = 270;
        protein = 30;
        carbohydrates = 26;
        fats = 14;
      };
    };
  };

  func quinoaTabbouleh() : Dish {
    {
      name = "Quinoa Tabbouleh";
      photoReference = "https://example.com/quinoa-tabbouleh";
      healthExplanation = "Gluten-free and low sodium.";
      ingredients = [
        "Quinoa",
        "Tomato",
        "Cucumber",
        "Parsley",
        "Lemon",
      ];
      instructions = [
        "Cook quinoa. Mix with vegetables.",
        "Add lemon and seasoning.",
      ];
      nutritionSummary = {
        calories = 220;
        sodium = 120;
        protein = 6;
        carbohydrates = 34;
        fats = 6;
      };
    };
  };

  func turkeyVegetableSoup() : Dish {
    {
      name = "Turkey Vegetable Soup";
      photoReference = "https://example.com/turkey-soup";
      healthExplanation = "Low sodium and gluten-free.";
      ingredients = [
        "Turkey",
        "Vegetables",
        "Broth",
        "Brown rice",
        "Spices",
      ];
      instructions = [
        "Simmer turkey, vegetables, and broth.",
        "Season and serve.",
      ];
      nutritionSummary = {
        calories = 280;
        sodium = 160;
        protein = 32;
        carbohydrates = 29;
        fats = 5;
      };
    };
  };

  func stuffedPeppers() : Dish {
    {
      name = "Stuffed Peppers";
      photoReference = "https://example.com/stuffed-peppers";
      healthExplanation = "Gluten-free and high protein.";
      ingredients = [
        "Bell peppers",
        "Ground turkey",
        "Brown rice",
        "Tomato",
        "Cheese",
      ];
      instructions = [
        "Stuff peppers with mixture.",
        "Bake at 180°C for 25 minutes.",
      ];
      nutritionSummary = {
        calories = 360;
        sodium = 220;
        protein = 22;
        carbohydrates = 34;
        fats = 10;
      };
    };
  };

  func sweetPotatoChili() : Dish {
    {
      name = "Sweet Potato Chili";
      photoReference = "https://example.com/sweet-potato-chili";
      healthExplanation = "High fiber and gluten-free.";
      ingredients = [
        "Sweet potato",
        "Beans",
        "Tomato",
        "Spices",
        "Rice",
      ];
      instructions = [
        "Cook potatoes and beans. Add spices.",
        "Serve with rice.",
      ];
      nutritionSummary = {
        calories = 320;
        sodium = 180;
        protein = 10;
        carbohydrates = 54;
        fats = 5;
      };
    };
  };

  func cauliVeggieStirFry() : Dish {
    {
      name = "Cauli Veggie Stir Fry";
      photoReference = "https://example.com/cauli-stir-fry";
      healthExplanation = "Low sodium and gluten-free.";
      ingredients = [
        "Cauliflower",
        "Carrots",
        "Broccoli",
        "Peas",
        "Soy sauce",
      ];
      instructions = [
        "Sauté vegetables.",
        "Add sauce and serve.",
      ];
      nutritionSummary = {
        calories = 210;
        sodium = 140;
        protein = 5;
        carbohydrates = 28;
        fats = 7;
      };
    };
  };
};
