<template>
    <div class="description">
      <div v-if="title" class="title">{{ title }}</div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "TextDescription",
    props: {
      title: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333"
      }
    }
  };
  </script>
  
  <style scoped>
  .description {
    color: var(--color);
    line-height: 1.5;
    margin-bottom: 20px;
    font-size: 19px; 
  }
  
  .title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>
  