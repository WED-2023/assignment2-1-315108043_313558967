<template>
  <div id="app">
    <div id="nav">
      <span v-if="!$root.store.username" class="welcomeText">
        <strong> Hello Guest!</strong>
      </span>
      <span v-else class="welcomeText">
        <strong>Welcome back {{ $root.store.username }}!</strong>
      </span>
      <StyledRouterLink :to="{ name: 'main' }">Vue Recipes</StyledRouterLink>|
      <StyledRouterLink :to="{ name: 'search' }">Search</StyledRouterLink>|
      <StyledRouterLink :to="{ name: 'about' }">About</StyledRouterLink>|
      <span v-if="!$root.store.username">
        <StyledRouterLink :to="{ name: 'register' }">Register</StyledRouterLink>|
        <StyledRouterLink :to="{ name: 'login' }">Login</StyledRouterLink>|
      </span>
      <span v-else>
        <div class="dropdown">
          <button class="dropbtn">My Recipes</button>
          <div class="dropdown-content">
            <StyledRouterLink :to="{ name: 'favoriteRecipes' }">Favorite Recipes</StyledRouterLink>
            <StyledRouterLink :to="{ name: 'myRecipes' }">My Recipes</StyledRouterLink>
            <StyledRouterLink :to="{ name: 'familyRecipes' }">Family Recipes</StyledRouterLink>
          </div>
        </div>|
        <!-- <StyledRouterLink :to="{ name: 'createRecipe' }">Create Recipe</StyledRouterLink>| -->
        <CreateRecipe :show="showCreateRecipe" @close="showCreateRecipe = false" />
        <button class="createRecipeBtn" @click="showCreateRecipe = true">
          Create New Recipe
      </button>|
       <button class="logoutBtn" @click="Logout">Logout</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import StyledRouterLink from './components/StyledRouterLink.vue';
import CustomButton from "./components/CustomButton.vue";
import CreateRecipe from "./components/CreateRecipe.vue";

export default {
  name: "App",
  components: {
    StyledRouterLink,
    CustomButton,
    CreateRecipe
  },
  data() {
    return {
      showCreateRecipe: false
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/nav_bar_style.scss";
</style>
