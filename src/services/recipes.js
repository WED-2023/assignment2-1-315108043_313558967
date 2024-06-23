// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_info from "../assets/mocks/GetRecipeInformation.json";
import family_recipe_preview from "../assets/mocks/family_recipe_preview.json";
import family_recipe_info_612345 from "../assets/mocks/GetFamilyRecipeInformation612345.json";
import family_recipe_info from "../assets/mocks/GetFamilyRecipeInformation612345.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview[i]);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
    return { data: { recipe: recipe_info } } ;
    // return { data: { recipe: recipe_full_view } } ;
}

export function mockGet3RandomeRecipes() {
  // Create a copy of recipe_preview to avoid modifying the original array
  const recipesCopy = [...recipe_preview];

  // Initialize an array to store the 3 random recipes
  let randomRecipes = [];

  // Ensure we have at least 3 recipes to choose from
  if (recipesCopy.length >= 3) {
    // Generate 3 distinct random indices
    let indices = [];
    while (indices.length < 3) {
      let randomIndex = Math.floor(Math.random() * recipesCopy.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    // Get the recipes at the selected indices
    randomRecipes = indices.map(index => recipesCopy[index]);
  } else {
    // If there are less than 3 recipes, return all available recipes
    randomRecipes = [...recipesCopy];
  }

  // Return the result in the desired format
  return { data: { recipes: randomRecipes } };
}

export function mockGet3LastWatchedRecipes() {
  return mockGetRecipesPreview(3);
}

export function mockGet5FavoritesRecipes(){
  return mockGetRecipesPreview(5)
}

export function mockGet4MyRecipes(){
  return mockGetRecipesPreview(4)
}

export function mockGetFamilyRecipes() {
  let recipes = [];
  console.log(family_recipe_preview.length)
  for(let i = 0; i < family_recipe_preview.length; i++){
    recipes.push(family_recipe_preview[i]);
  }

  return { data: { recipes: recipes } };
}

export function mockGetFamilyRecipeFullDetails(recipeId) {
  return { data: { recipe: family_recipe_info_612345 } } ;
}
