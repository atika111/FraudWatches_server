const axios = require("axios");
const countryCodes = require("../DBjson/countryCodes.json");

async function getCountryFromCoordinates(lat, lng) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.status === "OK") {
      const results = data.results;
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const addressComponents = result.address_components;
        for (let j = 0; j < addressComponents.length; j++) {
          const addressComponent = addressComponents[j];
          if (addressComponent.types.includes("country")) {
            return addressComponent.long_name; // Return the country name
          }
        }
      }
    }
    // If no country found, return null or an appropriate default value
    return null;
  } catch (error) {
    console.error("Error fetching data from Google Maps Geocoding API:", error);
    return null;
  }
}

function mapCountryNameToIsoCode(countryName) {
  return countryCodes[countryName] || null;
}

fetchEmergencyNumbersMiddleware = async (req, res, next) => {
  try {
    const { lat, lng } = req.body.position;
    console.log({ lat, lng });

    const country = await getCountryFromCoordinates(lat, lng);
    if (country) {
      console.log(`The country at (${lat}, ${lng}) is: ${country}`);
      console.log(mapCountryNameToIsoCode(country));
      const countryCode = mapCountryNameToIsoCode(country);
      const response = await axios.get(
        `https://emergencynumberapi.com/api/country/${countryCode}`
      );

      const ambulance = response.data.data.ambulance.all[0];
      const fire = response.data.data.fire.all[0];
      const police = response.data.data.police.all[0];
      const dispatch = response.data.data.dispatch.all[0];

      req.body.emergencyNumbers = { ambulance, fire, police, dispatch };
    } else {
      console.log("Country not found for the given coordinates.");
    }
    next();
  } catch (error) {
    res.send({ error });
  }
};

module.exports = { fetchEmergencyNumbersMiddleware };
