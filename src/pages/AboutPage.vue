<template>
  <div class="container">
    <PageTitle class="title">About</PageTitle>
    <TextDescription title="Welcome to Vue Recipes">
      Welcome to <strong>Vue Recipes</strong>! This application is created by two passionate students who wanted to bring people closer through the joy of cooking. We are dedicated to our loved families, and we hope this platform helps you create unforgettable meals and memories.
    </TextDescription>
    <TextDescription title="Our Inspiration">
      The inspiration behind <strong>Vue Recipes</strong> is our own families, who have always brought us together with delicious meals and cherished traditions. We wanted to create a space where you can find, share, and save recipes that will become part of your own family's story.
    </TextDescription>
    <TextDescription title="Share and Discover">
      <strong>Vue Recipes</strong> allows users to upload their favorite recipes and discover new ones from others. Whether it's a cherished family secret or a new favorite, you'll find a diverse collection of dishes to try.
    </TextDescription>
    <TextDescription title="Save Your Favorites">
      With <strong>Vue Recipes</strong>, you can save your favorite recipes to easily find them again. Plan a delightful meal for your loved ones, knowing you have the perfect recipes at your fingertips.
    </TextDescription>
    <TextDescription title="Join Our Community">
      We invite you to join our community of food lovers. Share your recipes, discover new ones, and enjoy the journey of cooking together with <strong>Vue Recipes</strong>.
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
