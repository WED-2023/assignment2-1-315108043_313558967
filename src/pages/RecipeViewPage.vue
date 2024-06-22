<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <PageTitle>{{ recipe.title }}</PageTitle>
      <div class="row">
           <!-- Recipe Image -->
           <div class="col-md-4">
            <img :src="recipe.image" class="image_center" />
          </div>
          <div class="col-md-8">
            <div class="mb-3">
              <div class="indicator-container">
              <img v-if="recipe.vegan" :src="require('@/assets/recipesTypes/vegan.png')" alt="Vegan" class="indicator vegan-indicator" />
              <img v-if="recipe.vegetarian" :src="require('@/assets/recipesTypes/veggie.png')" alt="Vegetarian" class="indicator vegetarian-indicator" />
              <img v-if="recipe.glutenFree" :src="require('@/assets/recipesTypes/glutenFree.png')" alt="Gluten-Free" class="indicator gluten-free-indicator" />
            </div>
              <h3>Ready in {{ recipe.readyInMinutes }} minutes</h3>
              <h3>Likes: {{ recipe.aggregateLikes }} likes</h3>
              <h3>Servings: {{ recipe.servings }}</h3>
              <button @click="prepareRecipe" class="btn btn-primary">Prepare the recipe</button>
            </div>
          </div>
        </div>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <h3> Ingredients </h3>
              <!-- <div v-for="(r, index) in recipe.extendedIngredients" -->
              <div v-for="(r, index) in recipe.extendedIngredients" :key="`ingredient-${r.id}-${index}`">

                <!-- :key="`ingredient-${r.id}-${index}`"> -->
                <!-- :key="index + '_' + r.id"> -->
                <TextDescription :checkbox="checkboxState"> {{r.original}} </TextDescription>
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
import { mockGetRecipeFullDetails } from "../services/recipes.js";
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
      checkboxState: false
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      const recipeId = this.$route.params.recipeId;
      // const response = await mockGetRecipeFullDetails(recipeId);

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );
        // console.log("recipeId = " + recipeId)
        response = mockGetRecipeFullDetails(recipeId);

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
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        vegan,
        vegetarian,
        glutenFree
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
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        vegan,
        vegetarian,
        glutenFree
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    prepareRecipe() {
      this.checkboxState = !this.checkboxState;
    }
  }
};
</script>

<style scoped>
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

</style>
