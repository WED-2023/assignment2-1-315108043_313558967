<template>
  <div class="container">
    <PageTitle class="title">Family Recipes</PageTitle>
    <!-- <div> -->
      <RecipePreviewList 
      ref="family"
      :fetchFunction="updateFamily"
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
  async updateFamily(){
    this.$refs.family.mockGetFamilyRecipes()
  }

}
}
</script>
