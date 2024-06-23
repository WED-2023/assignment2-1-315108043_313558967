<template>
    <div class="container">
      <PageTitle class="title">Family Recipes</PageTitle>
      <!-- <div> -->
        <RecipePreviewList 
        :fetchFunction="mockGetFamilyRecipes"
        :familyRecipe="true">
        Explore these recipes</RecipePreviewList>
      <!-- </div> -->
    </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { mockGetFamilyRecipes} from "../services/recipes.js";

export default {
  name: "FamilyRecipes",
  components: {
    PageTitle,
    RecipePreviewList
  },
  methods: {
    mockGetFamilyRecipes
  }
}
</script>
