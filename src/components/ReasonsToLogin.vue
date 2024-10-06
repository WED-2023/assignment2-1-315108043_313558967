<template>
  <div class="reasons-to-login">
    <TextDescription :title="loginTitle">
      Discover more with Vue Recipes! <strong>Unlock the full experience</strong> by logging in today. Whether you're searching for culinary inspiration, organizing your <strong>favorite recipes</strong>, or sharing creations, our community enhances your cooking journey.
    </TextDescription>
    <TextDescription>
      Log in to save and discover recipes, track culinary adventures, and connect with food enthusiasts. Start enhancing your cooking now!
    </TextDescription>
  </div>
</template>

<script>
import TextDescription from "../components/TextDescription.vue";

export default {
  name: 'ReasonsToLogin',
  components: {
    TextDescription
  },
  computed: {
    loginTitle() {
      return "Discover More with Vue Recipes!";
    }
  }
}
</script>

<style scoped>
.reasons-to-login {
  margin-top: 25px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
