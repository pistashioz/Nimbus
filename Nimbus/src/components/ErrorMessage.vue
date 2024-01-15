<template>
    <div class="error-container" v-if="message" :class="{ 'error-present': message }">
      <p class="error-message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        errorTimeout: null, // Keep track of the error timeout
      }
    },
    watch: {
      message(newValue) {
        if (newValue) {
            this.errorTimeout = setTimeout(() => {
            this.$emit('clear-error');
          }, 3000);
        }
      }
    },
    unmounted () {
        clearTimeout(this.errorTimeout); // Clear the timeout when component is destroyed
    }
  };
  </script>
  
  <style scoped>
  
  .error-container {
    max-height: 0; /* initially hide the error message */
  }

  .login .error-message{
    margin-bottom: 1rem;
  }
  

  /* When an error is present, increase the max-height */
  .error-container.error-present {
    transition: max-height 0.08s ease-in; 
    max-height: 62px; /* set to the maximum height the error message could have */
  }
  
  
  .error-message {
    color: red;
    font-family: 'Asap ExtraBold', sans-serif;
    margin-top: 0;
    margin-bottom: 0.2rem;
  }
  
  </style>
  