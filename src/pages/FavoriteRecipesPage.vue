<template>
  <div class="container">
    <PageTitle class="title">Favorite Recipes</PageTitle>
    <RecipePreviewList 
        :fetchFunction="mockGet5FavoritesRecipes">
        Favorite Recipes</RecipePreviewList>
  </div>
  
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { mockGet5FavoritesRecipes } from "../services/recipes";


export default {
name: "FavoriteRecipes",
components: {
  PageTitle,
  RecipePreviewList
},
methods: {
    mockGet5FavoritesRecipes
  },
}
</script>