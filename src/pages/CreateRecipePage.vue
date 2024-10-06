<template>
  <div class="container">
    <PageTitle class="title">Create Recipe</PageTitle>
    <CreateRecipe />
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
import CreateRecipe from "../components/CreateRecipe.vue";

export default {
  name: "CreateRecipePage",
  components: {
    PageTitle,
    CreateRecipe
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.title {
  margin-bottom: 20px;
}
</style>