<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <PageTitle>{{ recipe.title }}</PageTitle>
        <div class="row">
          <!-- Recipe Image -->
          <div class="col-md-4">
            <img :src="computedImageSrc" alt="Recipe Image" class="image_center" />
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <div class="indicator-container">
                <img v-if="recipe.vegan" :src="require('@/assets/recipesTypes/vegan.png')" alt="Vegan" class="indicator vegan-indicator" />
                <img v-if="recipe.vegetarian" :src="require('@/assets/recipesTypes/veggie.png')" alt="Vegetarian" class="indicator vegetarian-indicator" />
                <img v-if="recipe.glutenFree" :src="require('@/assets/recipesTypes/glutenFree.png')" alt="Gluten-Free" class="indicator gluten-free-indicator" />
              </div>
              <h3>Ready in {{ recipe.readyInMinutes }} minutes</h3>
              <h3 v-if="!familyRecipe">Likes: {{ recipe.aggregateLikes }} likes</h3>
              <h3 v-else>Recipe was cooked by: {{ recipe.recipeBy }}</h3>
              <h3>Servings: {{ servingsCount }}</h3>
            </div>
          </div>
          <div class="col-md-2">
            <button @click="prepareRecipe" class="btn btn-primary prepareRecipeBtn">Prepare the recipe</button>
            <div v-if="checkboxState" class="changeServingsAmountDiv">
              <button @click="increaseServings" class="btn btn-secondary mt-2 changeServingsAmount"> + </button>
              <button @click="decreaseServings" class="btn btn-secondary mt-2 changeServingsAmount"> - </button>
            </div>
            <select v-model="measureUnit" class="form-select mt-3 measureUnitSelect">
              <option value="us" selected>US</option>
              <option value="metric">Metric</option>
            </select>
            <br />
            <FavoriteIcon :recipeId="recipe.id" class="FavoriteIcon" />
          </div>
        </div>
      </div>
      <div class="recipe-body">
        <TextDescription v-if="familyRecipe">Family Occasions: {{ recipe.familyOccasions }}</TextDescription>
        <div v-if="familyRecipe" class="row mt-4">
          <div class="col">
            <h3>Preparation Images</h3>
            <div class="preparation-images">
              <img v-for="(imageName, index) in recipe.preparationImagesNames"
                :key="`preparation-image-${index}`"
                :src="require(`@/assets/preparation_images/${imageName}`)"
                alt="Preparation Image"
                class="preparation-image"
              />
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            <h3> Ingredients </h3>
            <div v-for="(ingredient, index) in recipe.extendedIngredients" :key="`ingredient-${index}`">
              <TextDescription :checkbox="checkboxState">{{ getIngredientText(ingredient) }}</TextDescription>
            </div>
          </div>
          <div class="wrapped">
            <h3> Instructions </h3>
            <div v-for="(s, index) in recipe._instructions" :key="`instruction-${s.number}-${index}`">
              <TextDescription :checkbox="checkboxState">{{ s.step }}</TextDescription>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetFullInfo, mockGetRecipeFullDetails, mockGetFamilyRecipeFullDetails } from "../services/recipes.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import TextDescription from "../components/TextDescription.vue";
import PageTitle from "../components/PageTitle.vue";
import FavoriteIcon from "../components/FavoriteIcon";

export default {
  components: {
    TextDescription,
    PageTitle,
    FavoriteIcon
  },
  data() {
    return {
      recipe: null,
      checkboxState: false,
      servingsCount: 0,
      measureUnit: 'us'
    };
  },
  async created() {
    try {
      let response;
      const recipeId = this.$route.params.recipeId;

      if (this.familyRecipe) {
        // Handle family recipe
        response = mockGetFamilyRecipeFullDetails(recipeId);
      } else {
        // Fetch either mock or real server data
        response = await GetFullInfo(recipeId);
      }

      const recipeData = response.data.recipe || response.data; // Adapt to both formats

      // Handle instructions (analyzed or string)
      let _instructions;
      if (recipeData.analyzedInstructions && recipeData.analyzedInstructions.length > 0) {
        _instructions = recipeData.analyzedInstructions.flatMap(fstep => fstep.steps);
      } 
      else {
        _instructions = recipeData.instructions
          ? recipeData.instructions.split(/<li>|<ol>|<\/li>|<\/ol>/).map(step => ({ step }))
          : [];
      }

      // Map the ingredients field (extendedIngredients or ingredients)
      const extendedIngredients = recipeData.extendedIngredients || recipeData.ingredients;

      this.recipe = {
        id: recipeData.id,
        title: recipeData.title,
        readyInMinutes: recipeData.readyInMinutes,
        image: recipeData.image,
        aggregateLikes: recipeData.aggregateLikes || recipeData.popularity,
        vegan: recipeData.vegan,
        vegetarian: recipeData.vegetarian,
        glutenFree: recipeData.glutenFree,
        servings: recipeData.servings,
        extendedIngredients, // Use the appropriate ingredients field
        instructions: recipeData.instructions,
        _instructions,
        familyOccasions: recipeData.familyOccasions,
        preparationImagesNames: recipeData.preparationImagesNames
      };

      this.servingsCount = this.recipe.servings;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    prepareRecipe() {
      this.checkboxState = !this.checkboxState;
      this.servingsCount = this.recipe.servings;
    },
    increaseServings() {
      this.servingsCount++;
    },
    decreaseServings() {
      if (this.servingsCount > 1) {
        this.servingsCount--;
      }
    },
    getAmountByMeasures(ingredient) {
      if (ingredient.measures) {
        return ingredient.measures[this.measureUnit]?.amount || ingredient.amount;
      }
      return ingredient.amount;
    },
    getUnitByMeasures(ingredient) {
      if (ingredient.measures) {
        return ingredient.measures[this.measureUnit]?.unitLong || ingredient.unit;
      }
      return ingredient.unit;
    },
    getIngredientText(ingredient) {
      let amount = (ingredient.amount / this.recipe.servings * this.servingsCount).toFixed(2).replace(/\.?0*$/, '');
      return `${amount} ${ingredient.unit} ${ingredient.name}`;
    }
  },
  computed: {
    familyRecipe() {
      return this.$route.params.familyRecipe === 'true'; // Convert to boolean if necessary
    },
    computedImageSrc() {
      if (this.familyRecipe && this.recipe && this.recipe.image) {
        return require(`@/assets/family_recipes_images/${this.recipe.image}`);
      } else if (this.recipe && this.recipe.image) {
        return this.recipe.image;
      } else {
        return ''; // Handle case where recipe or image is not available
      }
    }
  }
};
</script>

<style scoped>
@import "@/scss/recipeViewPage_style.scss";
</style>