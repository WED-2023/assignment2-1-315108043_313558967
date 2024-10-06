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
      default: "bold"
    }
  }
};
</script>

<style scoped>
.title {
  padding-top: 30px;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 50px;
}
</style>
