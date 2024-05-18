<template>
    <article class="cardArticle">
      <div class="cardImage">
        <img :src="image" width="100px" height="auto" loading="lazy" fetchpriority="high"> 
      </div>
      <div class="cardData">
        <p class="cardDescription">{{ description }}</p>
        <small class="cardName">{{ name }}, {{ country }}</small>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    props: {
      image: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    }
  };
  </script>
  