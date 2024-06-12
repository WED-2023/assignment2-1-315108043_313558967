<template>
    <b-button
      type="submit"
      variant="primary"
      class="custom-button" 
    >
      <slot>Login</slot>
    </b-button>
  </template>
  
  <script>
  export default {
    // Your script section if needed
  };
  </script>
  
  <style scoped>
  .custom-button {
    width: 100%;
    display: block;
    margin-top: 20px;
  }
  </style>
  