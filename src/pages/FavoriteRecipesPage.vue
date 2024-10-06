<template>
  <div class="container">
    <PageTitle class="title">Favorite Recipes</PageTitle>
    <RecipePreviewList 
        ref="favor"
        :fetch-function="updateFaveoriteList"
        :familyRecipe="false">
        Favorite Recipes</RecipePreviewList>
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
},
methods: {
  async updateFaveoriteList(){
        this.$refs.favor.updateFavorite()
    }

  }
}
</script>