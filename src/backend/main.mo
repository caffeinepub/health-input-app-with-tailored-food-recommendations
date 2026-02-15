import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import List "mo:core/List";

actor {
  type HealthInput = {
    age : Nat;
    weight : Nat;
    healthConditions : [Text];
    bloodPressure : BloodPressureCategory;
  };

  type BloodPressureCategory = {
    #low;
    #normal;
    #elevated;
    #high;
  };

  type FoodRecommendation = {
    food : Text;
    explanation : Text;
  };

  func determineBloodPressureCategory(systolic : Nat, diastolic : Nat) : BloodPressureCategory {
    if (systolic < 90 or diastolic < 60) { return #low };
    if (systolic >= 90 and systolic <= 120 and diastolic >= 60 and diastolic <= 80) {
      return #normal;
    };
    if (systolic > 120 and systolic <= 140 or diastolic > 80 and diastolic <= 90) {
      return #elevated;
    };
    #high;
  };

  func recommendFoods(healthConditions : [Text], bpCategory : BloodPressureCategory) : [FoodRecommendation] {
    let recommendations = List.empty<(Text, Text)>();

    for (condition in healthConditions.values()) {
      switch (condition) {
        case ("diabetes") {
          recommendations.add(("Quinoa", "Quinoa helps regulate blood sugar levels."));
          recommendations.add(("Berries", "Berries are low in sugar and high in antioxidants."));
        };
        case ("heart disease") {
          recommendations.add(("Salmon", "Salmon contains healthy omega-3 fatty acids."));
          recommendations.add(("Oats", "Oats help lower cholesterol levels."));
        };
        case ("anemia") {
          recommendations.add(("Spinach", "Spinach is rich in iron and helps with anemia."));
          recommendations.add(("Red meat", "Red meat is a good source of heme iron."));
        };
        case ("osteoporosis") {
          recommendations.add(("Dairy products", "Dairy products are high in calcium for bone health."));
          recommendations.add(("Leafy greens", "Leafy greens are rich in calcium and vitamin K."));
        };
        case ("hypertension") {
          recommendations.add(("Low-sodium foods", "Low-sodium foods help manage high blood pressure."));
          recommendations.add(("Bananas", "Bananas are a good source of potassium, which can lower blood pressure."));
        };
        case (_) {}; // Do nothing for unrecognized conditions
      };
    };

    // Blood pressure food recommendations
    let (food, explanation) = switch (bpCategory) {
      case (#low) {
        ("Salted nuts", "Salted nuts can help raise blood pressure due to their salt content.");
      };
      case (#high) {
        (
          "Leafy greens",
          "Leafy greens are low in sodium and rich in potassium, ideal for high blood pressure.",
        );
      };
      case (#elevated) {
        (
          "Berries/Low-fat dairy",
          "Berries and dairy help maintain normal blood pressure",
        );
      };
      case (#normal) {
        (
          "Balanced diet",
          "Maintaining a balanced diet supports stable blood pressure.",
        );
      };
    };
    recommendations.add((food, explanation));

    recommendations.toArray().map(func((food, explanation)) { { food; explanation } });
  };

  public query ({ caller }) func getFoodRecommendations(
    age : Nat,
    weight : Nat,
    healthConditions : [Text],
    systolicBP : Nat,
    diastolicBP : Nat,
  ) : async [FoodRecommendation] {
    let bpCategory = determineBloodPressureCategory(systolicBP, diastolicBP);
    recommendFoods(healthConditions, bpCategory);
  };
};
