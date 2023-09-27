// Import the fetchEmergencyNumbers function
const { fetchEmergencyNumbers } = require("./fetchEmergencyNumbers");

// Use getCountryFromCoordinates to obtain the country name
const lat = 40.7128; // Replace with your latitude
const lng = -74.006; // Replace with your longitude
getCountryFromCoordinates(lat, lng)
  .then((countryName) => {
    if (countryName) {
      console.log(`The country at (${lat}, ${lng}) is: ${countryName}`);

      // Use mapCountryNameToIsoCode to map the country name to a country code
      const countryCode = mapCountryNameToIsoCode(countryName);

      if (countryCode) {
        console.log(`The country code is: ${countryCode}`);

        // Use the country code to fetch emergency numbers
        fetchEmergencyNumbers(countryCode)
          .then((emergencyNumbers) => {
            if (emergencyNumbers) {
              console.log("Emergency numbers:", emergencyNumbers);
            } else {
              console.log("Failed to fetch emergency numbers.");
            }
          })
          .catch((error) => {
            console.error("Error fetching emergency numbers:", error);
          });
      } else {
        console.log("Country code not found for the given country name.");
      }
    } else {
      console.log("Country not found for the given coordinates.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
