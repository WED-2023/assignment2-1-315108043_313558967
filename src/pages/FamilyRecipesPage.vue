<template>
    <div class="container">
      <PageTitle class="title">Family Recipes</PageTitle>
      <!-- <div> -->
        <FamilyRecipePreviewList 
        :fetchFunction="mockGetFamilyRecipes">
        Explore these recipes</FamilyRecipePreviewList>
      <!-- </div> -->
    </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import FamilyRecipePreviewList from "../components/FamilyRecipePreviewList.vue";
import { mockGetFamilyRecipes} from "../services/recipes.js";

export default {
  name: "FamilyRecipes",
  components: {
    PageTitle,
    FamilyRecipePreviewList
  },
  methods: {
    mockGetFamilyRecipes
  }
}
</script>
