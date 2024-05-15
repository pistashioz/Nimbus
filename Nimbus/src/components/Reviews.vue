<template>
    <div id="reviews">
      <div class="review-titles">
        <h3 id="subHeadingReviews">Beyond the forecast</h3>
        <h2 id="headingReviews">Nimbus awaits</h2>
      </div>
  
      <div class="containerReview">
        <div class="cardContainer">
          <div class="cardContent">
            <div class="swipper-wrapper">
              <ReviewCard 
                v-for="(review, index) in reviews" 
                :key="index"
                :image="review.image"
                :description="review.description"
                :name="review.name"
                :country="review.country"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ReviewCard from "./ReviewCard.vue";
  import quotationMarkReview from '@/assets/img/quotationMarkReview.webp'
  
  export default {
    components: {
      ReviewCard
    },
    data() {
      return {
        quotationMarkReview,
        reviews: [
          {
            image: quotationMarkReview,
            description: "Top-notch weather app! Nimbus keeps me informed with accurate forecasts and handy features. The attention to detail in both design and data sets it apart.",
            name: "Freya",
            country: "Norway",
          },
          {
          image: quotationMarkReview,
          description: "Five stars for Nimbus! The app delivers precise weather updates with an elegant interface. The interactive map is a great touch, providing a comprehensive view.",
          name: "Isabella",
          country: "Sweden",
        },
        {
          image: quotationMarkReview,
          description: "Nimbus is my weather go-to! Accurate forecasts, user-friendly interface, and an interactive radar map for a complete experience. Highly recommended!",
          name: "Alex",
          country: "Canada",
        },
        {
          image: quotationMarkReview,
          description: "Informative and customizable. Real-time notifications for severe weather are a plus. A reliable weather companion.",
          name: "Zoe",
          country: "UK",
        },
        {
          image: quotationMarkReview,
          description: "Outstanding! Nimbus provides precise forecasts with a sleek design. Love the real-time notifications for severe weather. A top-notch weather app!",
          name: "Aisha",
          country: "UAE",
        },
        ]
      };
    },
  };
  </script>
  
  <style scoped>


#reviews {
    width: 100%;
    display: flex;
    /* height: 25em; */
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
.review-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  margin-top: 5em;
}
#subHeadingReviews{
  color: #303030;
  text-align: center;
  font-family: Asap;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
/*   position: relative;
  top: -5em; */
}
#headingReviews{
  color: #303030;
  text-align: center;
  font-family: Recoleta;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
/*   position: relative;
  top: -3em; */
}

.containerReview{
  display: flex;
  justify-content: center;
  align-items: center;
/*   position: relative;
  top: -17em; */
  
}


.cardContainer{
  margin-left:auto;
  margin-right:auto;
  position:relative;
  overflow:hidden;
  list-style:none;
  padding:0;
  z-index:1;
}

.cardContent{
  
  margin-inline-start: 2.5rem;
  border-radius: 1.25rem;
  overflow: hidden;
}

.cardArticle{
  border-radius: 20px;
background: #F2E6DD;
  flex-shrink:0;
  width:340px;
  height:auto;
  margin-right: 80px;
  position:relative;
  transition-property:transform;
}

.cardImage{
  position: relative;
padding-top: 1rem;
padding-left: 1rem;
margin-bottom: -0.75rem;
}
.swipper-wrapper {
  display: grid;
  grid-auto-flow: column;
  overflow: auto; 
  transform: translateX(0px); /* play with this from swipe of the reviews */
}

.cardData{
  padding: 0rem 1.5rem 1.5rem 1.5rem;
  border-radius: 1rem;
  text-align: start;
  position: relative;
  color: #303030;
  font-family: Asap;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
  </style>