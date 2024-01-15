<template>
      <button :type="buttonType" :class="buttonClass">
        <img v-if="iconSrc" :src="computedIconSrc" class="icon" />
        <span v-if="buttonText">{{ buttonText }}</span>
      </button>
  </template>
  
  <script>

  
  export default {
    props: {
      buttonText: String,
      buttonType: {
        type: String,
        default: 'button' // 'submit', 'button', etc.
      },
      buttonClass: {
        type: String,
        default: 'button-class'
      },
      iconSrc: String // Passing a keyword to perform the correct local path
    },
    computed: {
      computedIconSrc() {
        console.log(this.iconSrc);
        return new URL(`/src/assets/icons/${this.iconSrc}.svg`, import.meta.url).href
      }
    }
  };
  </script>
  <style scoped>
  /* Styles for your submit button */

button {

  border: 1px solid #303030;
  border-radius: 20px;
  cursor: pointer;
}

  .button-class {
  width: 15rem;
  padding: 0.75rem;
  background-color: #A4B8E4; 
  color: white;
  margin-bottom: 1rem;
}

.social-login .social,
.social-sign-up {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem;
  margin-bottom: 0.8rem;
}

.social-login .social {
  font-family: 'Asap Black', sans-serif; 
  font-size: 0.75rem;
  color: #303030;
  width: 11rem;
}

.social .icon{
  margin-right: 0.5rem;
}
/* Style for the icons inside the buttons */
.icon {
  width: 24px; /* Example size, adjust as needed */
  height: auto;
}

  </style>
  