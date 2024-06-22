// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_info from "../assets/mocks/GetRecipeInformation.json";


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
  return mockGetRecipesPreview(3);
}

export function mockGet3LastWatchedRecipes() {
  return mockGetRecipesPreview(3);
}

  
