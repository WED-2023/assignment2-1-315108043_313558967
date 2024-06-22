<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <PageTitle>{{ recipe.title }}</PageTitle>
      <div class="row">
           <!-- Recipe Image -->
           <div class="col-md-4">
            <img 
            :src="require(`@/assets/family_recipes_images/${recipe.imageName}`)"
            alt="Recipe Image"
            class="image_center" />
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <div class="indicator-container">
              <img v-if="recipe.vegan" :src="require('@/assets/recipesTypes/vegan.png')" alt="Vegan" class="indicator vegan-indicator" />
              <img v-if="recipe.vegetarian" :src="require('@/assets/recipesTypes/veggie.png')" alt="Vegetarian" class="indicator vegetarian-indicator" />
              <img v-if="recipe.glutenFree" :src="require('@/assets/recipesTypes/glutenFree.png')" alt="Gluten-Free" class="indicator gluten-free-indicator" />
            </div>
              <h3>Ready in {{ recipe.readyInMinutes }} minutes</h3>
              <h3>Recipe was cooked by: {{ recipe.recipeBy }}</h3>
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
          </div>
        </div>
      </div>
      <div class="recipe-body">
        <TextDescription>Family Occasions: {{ recipe.familyOccasions }}</TextDescription>
        <div class="row mt-4">
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
              <!-- <div v-for="(r, index) in recipe.extendedIngredients" -->
              <div v-for="(r, index) in recipe.extendedIngredients" :key="`ingredient-${r.id}-${index}`">

                <!-- :key="`ingredient-${r.id}-${index}`"> -->
                <!-- :key="index + '_' + r.id"> -->
                <!-- <TextDescription :checkbox="checkboxState"> {{r.original}} </TextDescription> -->
                <TextDescription :checkbox="checkboxState"> {{getIngredientText(r)}} </TextDescription>
              </div>
          </div>
          <div class="wrapped">
            <h3> Instructions </h3>
            <!-- <div v-for="s in recipe._instructions" 
            :key="`instruction-${s.number}-${index}`"> -->
            <div v-for="(s, index) in recipe._instructions" :key="`instruction-${s.number}-${index}`">
            <!-- :key="s.number"> -->
              <TextDescription :checkbox="checkboxState"> {{s.step}} </TextDescription>
            </div>
          </div>
        </div>

      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
import { mockGetFamilyRecipeFullDetails } from "../services/recipes.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BFormCheckbox } from 'bootstrap-vue';
import TextDescription from "../components/TextDescription.vue";
import PageTitle from "../components/PageTitle.vue";


export default {
  components: {
      TextDescription,
      PageTitle
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
      // response = this.$route.params.response;
      const recipeId = this.$route.params.recipeId;
      // const response = await mockGetFamilyRecipeFullDetails(recipeId);

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );
        // console.log("recipeId = " + recipeId)
        response = mockGetFamilyRecipeFullDetails(recipeId);

        // console.log("response.status", response.status);
        response.status = 200
        if (response.status !== 200)
        {
          this.$router.replace("/NotFound");
        }

      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        recipeBy,
        readyInMinutes,
        imageName,
        title,
        servings,
        vegan,
        vegetarian,
        glutenFree,
        familyOccasions,
        preparationImagesNames 
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        recipeBy,
        readyInMinutes,
        imageName,
        title,
        servings,
        vegan,
        vegetarian,
        glutenFree,
        familyOccasions,
        preparationImagesNames 
      };

      this.recipe = _recipe;
      this.servingsCount = this.recipe.servings;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    prepareRecipe() {
      this.checkboxState = !this.checkboxState;
      this.servingsCount = this.recipe.servings; // Initialize servingsCount with recipe.servings
    },
    increaseServings() {
      this.servingsCount++;
      
    },
    decreaseServings() {
      if (this.servingsCount > 1) {
        this.servingsCount--;
      }
    },
    getAmountByMeasures(r){
      return r.measures[this.measureUnit].amount;
    },
    getUnitByMeasures(r){
      return r.measures[this.measureUnit].unitLong;
    },
    getIngredientText(r) {
      let currentUnit = this.getUnitByMeasures(r)
      let originalAmount = this.getAmountByMeasures(r);
      let originalServings = this.recipe.servings;
      let currentAmount = (originalAmount / originalServings * this.servingsCount).toFixed(2).replace(/\.?0*$/, '');
      return `${currentAmount} ${currentUnit} ${r.originalName}`;
    }
  }
};
</script>

<style scoped>
@import "@/scss/recipeViewPage_style.scss";

.preparation-images {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.preparation-image {
  max-height: 150px; /* Adjust according to your design */
  height: auto;
}
</style>

<!-- <style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 100%;
}

.image_center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

.indicator-container {
  display: flex;
  gap: 10px;
}


.indicator {
  width: 40px;
  height: 40px;
}

.recipe-header {
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.preparation-images {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.preparation-image {
  max-height: 150px; /* Adjust according to your design */
  height: auto;
}


</style> -->
