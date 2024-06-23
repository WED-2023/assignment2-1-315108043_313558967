<template>
  <div class="container">
    <PageTitle class="title">Favorite Recipes</PageTitle>
    <RecipePreviewList>Favorites</RecipePreviewList>
  </div>
  
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";


export default {
name: "FavoriteRecipes",
components: {
  PageTitle,
  RecipePreviewList
}
}
</script>