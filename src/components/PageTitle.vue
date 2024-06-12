<template>
  <h1 class="title">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  props: {
    marginBottom: {
      type: String,
      default: "0px"
    },
    fontWeight: {
      type: String,
      default: "bold" // Set default fontWeight to bold
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 30px; /* Set margin-bottom */
  font-weight: bold; /* Set font weight */
  /* Add any additional styles for titles here */
}
</style>
