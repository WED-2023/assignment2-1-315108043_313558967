<template>
  <router-link :to="to" class="styled-link">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'StyledRouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
};
</script>

<style scoped>
.styled-link {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  transition: color 0.3s, background-color 0.3s;
}

.styled-link:hover {
  background-color: #42b983;
  color: white;
}
</style>
