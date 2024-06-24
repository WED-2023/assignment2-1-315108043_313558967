<template>
  <router-link
    :to="{ name: 'recipe', params: { familyRecipe: familyRecipe ? 'true' : 'false', recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <b-card
      :title="recipe.title"
      :img-src="computedImageSrc"
      img-alt="Image"
      img-top
      tag="article"
      :style="computedStyle"
      class="mb-2 recipe-card"
    >
      <div class="indicator-container">
        <img v-if="recipe.vegan" :src="require('@/assets/recipesTypes/vegan.png')" alt="Vegan" class="indicator vegan-indicator" />
        <img v-if="recipe.vegetarian" :src="require('@/assets/recipesTypes/veggie.png')" alt="Vegetarian" class="indicator vegetarian-indicator" />
        <img v-if="recipe.glutenFree" :src="require('@/assets/recipesTypes/glutenFree.png')" alt="Gluten-Free" class="indicator gluten-free-indicator" />
      </div>
      <b-card-text>
        <ul class="recipe-overview list-unstyled mb-0">
          <li><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</li>
          <li v-if="!familyRecipe"><strong>Likes:</strong> {{ recipe.aggregateLikes }}</li>
          <li v-if="familyRecipe"><strong>Cooked by:</strong> {{ recipe.recipeBy }}</li>
          <li v-if="familyRecipe"><strong>Family Occasions:</strong> {{ recipe.familyOccasions }}</li>
        </ul>
      </b-card-text>
      <div class="bottom-indicators">
        
        <img v-if="hasUserSeenRecipe(recipe.id)" :src="require('@/assets/seen.png')" alt="Seen" class="indicator seen-indicator" />
        <FavoriteIcon :recipeId="recipe.id" />
      </div>
    </b-card>
  </router-link>
</template>

<script>
import FavoriteIcon from "./FavoriteIcon";
import { mockHasUserSeenRecipe } from "../services/user";

export default {
  name: "recipePreview",
  components: {
    FavoriteIcon
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    familyRecipe: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    computedImageSrc() {
      console.log(this.familyRecipe);
      if (this.familyRecipe) {
        return require(`@/assets/family_recipes_images/${this.recipe.imageName}`);
      } else {
        return this.recipe.image;
      }
    },
    computedStyle() {
      return {
        width: '14rem',
        minHeight: this.familyRecipe ? '28em' : '23em'
      };
    }
  },
  methods: {
    hasUserSeenRecipe(recipeId) {
      const result = mockHasUserSeenRecipe(recipeId);
      console.log(`Checking if user has seen recipe ${recipeId}: ${result}`);
      return result;
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  text-decoration: none;
  color: inherit;
  position: relative; /* Ensures absolutely positioned elements are relative to this container */
}

.recipe-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
  cursor: pointer;
}

.recipe-title {
  font-weight: bold;
}

.recipe-overview {
  padding-left: 0;
}

.indicator-container {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bottom-indicators {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.indicator {
  width: 40px;
  height: 40px;
}

.seen-indicator {
  width: 40px;
  height: 40px;
}
</style>
