<template>
    <img
      :src="isFavorite ? require('@/assets/favorite.png') : require('@/assets/not_favorite.png')"
      alt="Favorite"
      class="indicator favorite-indicator"
      @click.stop.prevent="toggleFavorite"
    />
  </template>
  
  <script>
  import { mockIsFavoriteRecipe, mockAddFavorite, mockRemoveFavorite } from "../services/user";
  
  export default {
    name: "FavoriteIcon",
    props: {
      recipeId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isFavorite: mockIsFavoriteRecipe(this.recipeId)
      };
    },
    methods: {
      toggleFavorite(event) {
        event.preventDefault();
        if (this.isFavorite) {
          const response = mockRemoveFavorite(this.recipeId);
          if (response.status === 200 && response.response.data.success) {
            this.isFavorite = false;
            console.log(response.response.data.message);
          }
        } else {
          const response = mockAddFavorite(this.recipeId);
          if (response.status === 200 && response.response.data.success) {
            this.isFavorite = true;
            console.log(response.response.data.message);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .indicator {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  </style>
  