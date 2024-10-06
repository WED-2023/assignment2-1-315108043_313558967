// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_info from "../assets/mocks/GetRecipeInformation.json";
import family_recipe_preview from "../assets/mocks/family_recipe_preview.json";
import family_recipe_info_612345 from "../assets/mocks/GetFamilyRecipeInformation612345.json";
import family_recipe_info from "../assets/mocks/GetFamilyRecipeInformation612345.json";

import api from "/src/main.js"

const routerPrefix = "/recipes"
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

  return recipes;
}

export function mockGetFamilyRecipeFullDetails(recipeId) {
  return { data: { recipe: family_recipe_info_612345 } } ;
}


export async function Get3RandomRecipes(number = 3) {
  try {
    const params = {
      count:number
    }
    // Use the 'number' parameter to specify how many random recipes to get
    const response = await api.get(`${routerPrefix}/Random`,{ params });
    
    // Format the response to match the mock function structure
    return response.data;
  } catch (error) {
    console.log(error)
    }
}

export async function GetFullInfo(recipeId) {
  try {

    
    // Fetch the recipe details from the server
    const response = await api.get(`${routerPrefix}/recipeFullDetails/${recipeId}`);

    // Log the raw server response for debugging
    console.log(response.data);

    // Return the raw server response wrapped like in mockGetRecipeFullDetails
    return { data: { recipe: response.data } };
  } catch (error) {
    try{
      const response = await api.get(`${routerPrefix}/myRecipeFullDetails/${recipeId}`);

// Log the raw server response for debugging
console.log(response.data);

// Extract the data from the response
const rawRecipe = response.data.recipe;

// Format the instructions into a single string with <li> tags and wrap in <ol> tags
const formattedInstructions = `<ol>${rawRecipe.instructions.map(step => `<li>${step.step}</li>`).join('')}</ol>`;

// Map the recipe data to match the desired format
const formattedRecipe = {
  id: rawRecipe.id,
  title: rawRecipe.title,
  readyInMinutes: rawRecipe.readyInMinutes,
  image: rawRecipe.image,
  aggregateLikes: rawRecipe.aggregateLikes,
  vegan: rawRecipe.vegan,
  vegetarian: rawRecipe.vegetarian,
  glutenFree: rawRecipe.glutenFree,
  servings: rawRecipe.servings,
  ingredients: rawRecipe.ingredients.map(ingredient => ({
    name: ingredient.name,
    amount: parseFloat(ingredient.amount), // Convert amount to number if it's stored as a string
    unit: ingredient.unit
  })),
  instructions: formattedInstructions,
  summary: rawRecipe.summary,
  nutrition: [] // Assuming nutrition is not part of the current response
};

// Return the formatted recipe data like in mockGetRecipeFullDetails
return { data: formattedRecipe };
    }catch(error){
        console.log(error)
    }

    // throw error;
  }
}


export async function getSearchResults(recipeName, cuisine, diet, intolerance, number ) {
  try {
    

    // Make a GET request to the /search endpoint with query parameters
    const response = await api.get(`${routerPrefix}/search`, 
    {
      params:{
      recipeName: recipeName || '',  // If no recipe name is passed, default to an empty string
      cuisine: cuisine || '',        // Default to empty if not provided
      diet: diet || '',              // Default to empty if not provided
      intolerance: intolerance || '',// Default to empty if not provided
      number: number                 // Default to 5 if not provided
    
    }
  });

    console.log("recipes found:",response.data);
    // Return the search results
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}
export async function getMyRecipes() {
  const response = await api.get(`${routerPrefix}/myRecipes`);
  return response.data;
}

export async function addNewRecipe(recipeData) {
  try {
    // Ensure all required fields are provided
    const { title, image_url, ready_in_minutes, aggregate_likes, vegetarian, vegan, gluten_free, summary, ingredients, instructions, servings } = recipeData;

    // Create the payload for the API request
    const payload = {
      title,
      image_url,
      ready_in_minutes,
      aggregate_likes,
      vegetarian,
      vegan,
      gluten_free,
      summary,
      ingredients,
      instructions,
      servings
    };

    // Send a POST request to the AddNewRecipe API with the recipe data
    const response = await api.post(`${routerPrefix}/AddNewRecipe`, payload);

    // Return the response data from the API
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors by passing the error details for proper handling
    console.log(error.response ? error.response.data : error);
  }


}



