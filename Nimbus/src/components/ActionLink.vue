<template>
    <div class="action-link" @click="handleClick">
      <span v-if="preText" class="pre-text">{{ preText }}</span>
      <span v-if="text" class="main-text">{{ text }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      preText: String, // Optional text to display before the main text
    },
    methods: {
      handleClick(event) {
        this.$emit('handleClick', event); // Emit an event when the link is clicked
      }
    }
  };
  </script>
  
  <style scoped>
  .action-link {
    font-size: 0.94rem;
    display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-0.5%);
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0;
  }

  .action-link.left{
justify-content: flex-start;
margin-top: 0;
margin-bottom: 1rem;
  }


  .main-text {
    cursor: pointer;
    color: #858585; ; 
    text-decoration: underline;
  }


  .pre-text {
    text-decoration: none;
    margin: 0;
  padding-right: 0.5rem;
  pointer-events: none;
  }
  </style>
  