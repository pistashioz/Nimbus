import { loadScript } from "./utils.js";

const API_KEY = '39d7058ef12ab5dae395f420fd79ec5a'; // OpenWeather API key
const GOOGLE_API_KEY = 'AIzaSyCyW66L8sE0ZKKaHV0q-HfLgeEY2L-zH8k' // Google Maps API key



export function loadGoogleMapsAPI() {
  loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`, () => {
    console.log('Google Maps API script loaded');
    // Additional logic after the API is loaded, if needed
  });
}



// Example in weatherService.js
window.initMap = function() {
    console.log("Google Maps API initialized");
    // Additional initialization logic here
  };

  export const ProvidesLocation = (target) => {

    const options = {
        types: ['geocode'],
    }
    console.log(target);
    const autocomplete = new google.maps.places.Autocomplete((target), options);

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
        console.log(place.name);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
    });
  };
  
export const LocationService = {
  async search(query) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    return response.json();
  },
};

