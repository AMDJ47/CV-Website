
function fetchWeather(latitude, longitude) {
    const locationUrl = https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude};

    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const location = data[0].title; // Location name
                const woeid = data[0].woeid;    // WOEID of the location

                // Now, fetch the current weather using the WOEID
                const weatherUrl = https://www.metaweather.com/api/location/${woeid}/;

                fetch(weatherUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        const weatherDescription = weatherData.consolidated_weather[0].weather_state_name;
                        const temperature = weatherData.consolidated_weather[0].the_temp;

                        // Display the weather data
                        document.getElementById('location').innerText = Location: ${location};
                        document.getElementById('weather').innerText = Weather: ${weatherDescription};
                        document.getElementById('temperature').innerText = Temperature: ${temperature.toFixed(1)}°C;
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            } else {
                alert('Location not found!');
            }
        })
        .catch(error => console.error('Error fetching location:', error));
}

// Function to get the user's current geolocation
function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Call the fetchWeather function with the user's coordinates
            fetchWeather(latitude, longitude);
        }, function(error) {
            console.error("Error getting location: ", error);
            alert("Failed to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
getGeolocation();
