import { loadScript } from "./utils.js";

const API_KEY = '39d7058ef12ab5dae395f420fd79ec5a'; // OpenWeather API key
const GOOGLE_API_KEY = 'AIzaSyCyW66L8sE0ZKKaHV0q-HfLgeEY2L-zH8k' // Google Maps API key



export function loadGoogleMapsAPI() {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
        console.log('Google Maps API is already loaded.');
        return;
    }
    
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places,geocoder`;
    loadScript(scriptUrl, () => {
        console.log('Google Maps API script loaded');
    });
}


export const getAutocompletePredictions = async (input) => {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.maps.places) {
        reject('Google Maps Places API not loaded');
        return;
      }
  
      const service = new google.maps.places.AutocompleteService();
      service.getQueryPredictions({ input }, (predictions, status) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          reject(status);
          return;
        }
        resolve(predictions);
      });
    });
  };

  // Function to fetch place details using place_id
export const fetchPlaceDetails = (placeId) => {
  return new Promise((resolve, reject) => {
      if (!window.google || !window.google.maps.places) {
          reject('Google Maps Places API not loaded');
          return;
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: placeId }, (results, status) => {
          if (status === 'OK') {
              if (results[0]) {
                  resolve(results[0]);
              } else {
                  reject('No results found');
              }
          } else {
              reject('Geocoder failed due to: ' + status);
          }
      });
  });
};

  
  export const reverseGeocode = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  
      geocoder.geocode({ location: latlng }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  };
  
export const ProvidesLocation = (target, callback) => {
    const options = { types: ['geocode'] };
    const autocomplete = new google.maps.places.Autocomplete(target, options);

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        
        // Prepare the place details
        const placeDetails = {
            name: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        // Invoke the callback with the place details
        callback(placeDetails);
    });
};

// OpenWeather reverse geocoding function
export const reverseGeocodeOpenWeather = async (latitude, longitude, limit = 1) => {
  const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${API_KEY}`;
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Returns the full response data
  } catch (error) {
      console.error('Error in OpenWeather reverse geocoding:', error);
      throw error;
  }
};


/* export const LocationService = {
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

 */