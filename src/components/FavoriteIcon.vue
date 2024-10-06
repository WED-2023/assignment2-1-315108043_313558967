<template>
  <div v-if="isUserLoggedIn">
    <img
      :ref="fav"
      :src="imageSrc" 
      alt="Favorite"
      class="indicator favorite-indicator"
      :class="{ disabled: isFavorite }" 
      @click.stop.prevent="toggleFavorite"
    />
  </div>
</template>

<script>
import { AddFavorite, isFavorite } from "../services/user";

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
      isFavorite: false, // Initialize to false
      imageSrc: require('@/assets/not_favorite.png'), // Default image
      isUserLoggedIn: false // Default to false
    };
  },
  async mounted() {
    // Check if the user is logged in (replace with your actual logic)
    this.isUserLoggedIn = this.checkUserLoggedIn();

    if (this.isUserLoggedIn) {
      try {
        // Fetch whether the recipe is already a favorite or not
        const response = await isFavorite(this.recipeId);

        // Update the isFavorite state based on the "favorited" property from the API
        this.isFavorite = response.favorited;

        // Set the initial image based on the favorite status
        this.updateImageSrc();
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    }
  },
  methods: {
    async toggleFavorite(event) {
      event.preventDefault();

      // Optimistically toggle the favorite status and update the image immediately
      this.isFavorite = !this.isFavorite;

      // Immediately update the image
      this.updateImageSrc();

      try {
        // Make the API call to add or remove the favorite
        const response = await AddFavorite(this.recipeId);

        if (!(response.status === 200 && response.data.success)) {
          // If the API fails, revert the state and image
          this.isFavorite = !this.isFavorite;
          this.updateImageSrc();
          console.error("Error updating favorite status:", response.data.message);
        }
      } catch (error) {
        // If the API fails, revert the state and image
        this.isFavorite = !this.isFavorite;
        this.updateImageSrc();
        console.error("Error updating favorite status:", error);
      }
    },
    updateImageSrc() {
      // Change the image based on the favorite status
      this.imageSrc = this.isFavorite
        ? require('@/assets/favorite.png') // Use the "favorite" image when favorited
        : require('@/assets/not_favorite.png'); // Use the "not favorite" image when not favorited
    },
    checkUserLoggedIn() {
      // Replace this with your actual check for logged-in status
      return !!this.$root.store.username;
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

/* Disabled class when the recipe is already a favorite */
.indicator.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>