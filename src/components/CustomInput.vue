<template>
  <div class="custom-input-container">
    <div class="input-field">
      <label class="input-label">{{ label }}</label>
      <slot></slot>
    </div>
    <!-- Feedback directly under the input field -->
    <div class="input-comments">
      <!-- Show feedback text only if there's an error -->
      <span v-if="hasError">
        <slot name="feedback"></slot>
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    // Add a prop to determine if there's an error
    hasError: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.custom-input-container {
display: flex;
flex-direction: column;
margin-bottom: 1.5rem;
}

.input-label {
margin-bottom: 0.5rem;
font-size: 1.2rem;
font-weight: bold;
margin-right: 10px; /* Add margin between label and input */
}

.input-field {
display: flex;
align-items: center; /* Align items vertically */
}

.input-comments {
color: red;
font-size: 0.875rem;
margin-top: 0.5rem; /* Adjust margin for feedback */
}

.input-comments slot {
margin-left: 10px; /* Adjust spacing between input and feedback */
}
</style>
