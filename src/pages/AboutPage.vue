<template>
    <div class="container">
    <PageTitle class="title">About</PageTitle>
    <TextDescription title="Welcome to Vue Recipes">
      Welcome to <strong>Vue Recipes</strong>! This application is designed to help you find, share, and create delicious recipes.
    </TextDescription>
    <TextDescription title="Inspiration and Tracking">
      Whether you're looking for inspiration for your next meal or want to keep track of your <strong>favorite family recipes</strong>, Vue Recipes has you covered.
    </TextDescription>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import TextDescription from "../components/TextDescription.vue";

export default {
  name: "About",
  components: {
    PageTitle,
    TextDescription
  }
}
</script>
