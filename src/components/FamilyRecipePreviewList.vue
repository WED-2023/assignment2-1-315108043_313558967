<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <FamilyRecipePreview
          class="recipePreview"
          :recipe="r"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FamilyRecipePreview from "./FamilyRecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    FamilyRecipePreview
  },
  props: {
    title: {
      type: String,
      required: false
    },
    fetchFunction: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        // const amountToFetch = 5; // sSet this to how many recipes you want to fetch
        const response = this.fetchFunction();


        // console.log(response);
        const recipes = response.data.recipes;
        // console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
