<template>
    <div class="animated-circles">
      <div class="circle-container" v-for="index in 4" :key="index">
        <div class="circle">
          <!-- Display location if added, else show placeholder -->
          <span v-if="selectedLocations.length >= index">
            {{ selectedLocations[index - 1].main_text }}
          </span>
          <span v-else>
            Location #{{ index }}
          </span>
          <!-- Show remove button only if location is added -->
          <button 
            class="close-button" 
            v-if="selectedLocations.length >= index"
            @click="removeLocation(index - 1)"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedLocations: Array,
    },
    methods: {
      removeLocation(index) {
        this.$emit('remove-location', index);
      }
    }
  };
  </script>

  
  <style scoped>
.animated-circles {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  grid-gap: 20px 10px; /* Space between grid items */
  justify-content: center;
  align-items: center;
  justify-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.circle-container {
  position: relative;
}

.circle {
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  background-color: #4A90E2;
  /* border: 1px solid #303030; */
  animation: deform 8s infinite alternate ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
padding: 1rem;
  font-family: 'Recoleta';
font-size: 20px;
font-style: normal;
}

.close-button {


    color: #303030;
    
background: none;
  cursor: pointer;
  font-size: 0.6rem;
border: none;
}
.close-button:hover {
    text-decoration: underline;
}


/* Unique styles for each circle */
.circle-container:nth-child(1) .circle {
  background-color: #E24A4A;
  animation-duration: 6s;
}

.circle-container:nth-child(2) .circle {
  background-color: #4AE2A1;
  animation-duration: 4s;
}

.circle-container:nth-child(3) .circle {
  background-color: #E2D84A;
  animation-duration: 7s;
}

.circle-container:nth-child(4) .circle {
  background-color: #8A4AE2;
  animation-duration: 5s;
}

@keyframes deform {
  0%, 100% {
    border-radius: 50%;
  }
  25% {
    border-radius: 70% 30% 25% 75% / 65% 35% 60% 40%;
  }
  50% {
    border-radius: 30% 70% 55% 45% / 35% 65% 40% 60%;
  }
  75% {
    border-radius: 40% 60% 30% 70% / 50% 50% 50% 50%;
  }
}

  </style>
  