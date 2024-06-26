// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  export function mockRemoveFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  export function mockAddUserRecipe(recipeDetails) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  }

  // Mock function to check if a user has seen a recipe
  export function mockHasUserSeenRecipe(recipeId) {
  // Mock data: List of recipe IDs the user has seen
  const seenRecipes = [716429, 716432 , 716434, 716437,716438]; // Example IDs, replace with actual logic
  return seenRecipes.includes(recipeId);
}


export function mockIsFavoriteRecipe(recipeId) {
  // Mock data: List of recipe IDs the user has seen
  const favRecipes = [716429, 716430 , 716431, 716432,716433]; // Example IDs, replace with actual logic
  return favRecipes.includes(recipeId);
}
  
  