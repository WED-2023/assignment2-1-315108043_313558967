<template>
  <div class="container">
    <PageTitle class="title">My Recipes</PageTitle>
    <RecipePreviewList 
        :fetchFunction="mockGet4MyRecipes">
        My Recipes</RecipePreviewList>
  </div>
  
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { mockGet4MyRecipes } from "../services/recipes";


export default {
name: "FavoriteRecipes",
components: {
  PageTitle,
  RecipePreviewList
},
methods: {
    mockGet4MyRecipes
  },
}
</script>