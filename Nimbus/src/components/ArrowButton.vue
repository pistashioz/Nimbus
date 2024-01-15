<template>
    <button type="button" :class="['arrow-button', buttonClass]" @click="onClick" :style="buttonStyle">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14.73 21" class="arrow-icon">
        <path d="M6.66,20.71c.39.39,1.02.39,1.41,0l6.36-6.36c.39-.39.39-1.02,0-1.41-.39-.39-1.02-.39-1.41,0l-5.66,5.66L1.71,12.93c-.39-.39-1.02-.39-1.41,0-.39.39-.39,1.02,0,1.41l6.36,6.36ZM6.36,1v18c0,.55.45,1,1,1h0c.55,0,1-.45,1-1V1C8.36.45,7.92,0,7.36,0h0c-.55,0-1,.45-1,1Z"/>
      </svg>
    </button>
  </template>
  
  
  <script>
  export default {
    props: {
      direction: {
        type: String,
        required: true,
        validator: value => ['up', 'down', 'left', 'right'].includes(value)
      },
      buttonClass: {
      type: String,
      default: '' // This allows us to pass an additional class for styling specific arrows
    },
      altText: {
        type: String,
        default: 'Arrow'
      }
    },
    computed: {
/*       computedArrowSrc() {
        return new URL(`/src/assets/icons/arrow.svg`, import.meta.url).href;
      }, */
      buttonStyle() {
        // Determine the rotation based on the direction prop
        const rotations = {
          up: '180deg',
          down: '0deg',
          left: '90deg',
          right: '270deg',
        };
        return {
          transform: `rotate(${rotations[this.direction]})`
        };
      }
    },
    methods: {
      onClick() {
        this.$emit('clickButton');
      }
    }
  };
  </script>
  
  <style scoped>
  .arrow-button {
    background:#E18AD1;
    border-radius: 24px;
    border: 1px solid #303030;
    cursor: pointer;
    padding: 10px; 
    fill: #303030; /* Coloring of the arrow's svg */
  }


/* To target specific buttons, you can add a class or data attribute to the button element and style accordingly */
.arrow-button.special .arrow-icon path {
  fill: #d9d9d9; /* Different color for 'special' buttons */
}

  .arrow-icon {
    /* Ensures the arrow icon rotates around its center */
    display: block;
    width: 24px; 
    height: 24px;
    transition: transform 0.3s;
  }
  </style>
  