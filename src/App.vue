<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <!-- {{ !$root.store.username }} -->
      <span v-if="!$root.store.username">
        Hello Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        Welcome back {{ $root.store.username }}: <button @click="Logout">Logout</button>|
        <div class="dropdown">
          <button class="dropbtn">My Recipes</button>
          <div class="dropdown-content">
            <router-link :to="{ name: 'favoriteRecipes' }">Favorite Recipes</router-link>
            <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>
            <router-link :to="{ name: 'familyRecipes' }">Family Recipes</router-link>
          </div>
        </div>|
        <router-link :to="{ name: 'createRecipe' }">Create Recipe</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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
