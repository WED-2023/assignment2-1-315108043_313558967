<template>
  <div id="app">
    <div id="nav">
      <span v-if="!$root.store.username">
        <strong> Hello Guest!</strong>
      </span>
      <span v-else>
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
        <StyledRouterLink :to="{ name: 'createRecipe' }">Create Recipe</StyledRouterLink>|
        
       <button @click="Logout">Logout</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
import StyledRouterLink from './components/StyledRouterLink.vue';

export default {
  name: "App",
  components: {
    StyledRouterLink
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
@import "@/scss/form-style.scss";
@import "@/scss/nav_bar_style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
