<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :familyRecipe="familyRecipe" 
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getSearchResults,Get3RandomRecipes,getMyRecipes,mockGetFamilyRecipes} from "../services/recipes";
import RecipePreview from "./RecipePreview.vue";
import { getFavorite } from "../services/user";


export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: false
    },
    fetchFunction: {
      type: Function,
      required: true
    },
    familyRecipe: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.fetchFunction();
    }  // this.updateRandom();
  ,
  methods: {
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        // const amountToFetch = 5; // sSet this to how many recipes you want to fetch
        const response = this.fetchFunction();


        // console.log(response);
        const recipes = response.data.recipes;
        // console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },

    async mockGetFamilyRecipes(){
        this.recipes = mockGetFamilyRecipes();
    },

    async updateRandom(){
      try {
        
        // console.log(response);
        const recipes = await Get3RandomRecipes()
        // console.log(recipes);
        // alert("recipes")
        this.recipes = recipes;
        
        // this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateFavorite(){
      try {
        
        // console.log(response);
        const recipes = await getFavorite()
        // console.log(recipes);
        // alert("recipes")
        this.recipes = recipes;
        
        // this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateResults(searchQuery,selectedCuisines,selectedDiets,selectedIntolerances,number){
      // Check if the search query is empty and there are no selected filters
      if (!searchQuery.trim()) {
        // If both search query and filters are empty, clear the search results and return early
        this.recipes = [];
        return;
      }

      const recipes = await getSearchResults(
          searchQuery, // Recipe name from the search query input
          selectedCuisines.join(','), // Selected cuisines as a comma-separated string
          selectedDiets.join(','), // Selected diets as a comma-separated string
          selectedIntolerances, // Selected intolerances as a comma-separated string
          number                                   // Number of results to return
        );
    
      this.recipes = recipes;
    },
    async updateMyRecipesList(){
      try {
        
        // console.log(response);
        const recipes = await getMyRecipes()
        console.log(recipes);
        // alert("recipes")
        this.recipes = recipes;
        
        // this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
