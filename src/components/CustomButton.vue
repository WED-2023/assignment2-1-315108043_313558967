<template>
  <b-button
    :class="customButtonClass" 
  >
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    customButtonClass() {
      return {
        'custom-button': true,
        'custom-button-extended': this.fullWidth
      };
    }
  }
};
</script>

<style scoped>
.custom-button {
  display: block;
  color: white;
  background-color: #154ad0;
  font-weight: bold;
}


.custom-button-extended {
  width: 100%;
  margin-top: 20px;
}

.custom-button:hover{
  font-weight: bold;
  background-color: #8ba9f3;
}
</style>
