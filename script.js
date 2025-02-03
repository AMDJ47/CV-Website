// Function to fetch weather based on latitude and longitude using WeatherAPI
function fetchWeather(latitude, longitude) {
    // WeatherAPI URL (No API key required)
    const weatherUrl = https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${latitude},${longitude}&aqi=no;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.location) {
                const location = data.location.name; // Location name
                const weatherDescription = data.current.condition.text; // Weather description
                const temperature = data.current.temp_c; // Temperature in Celsius

                // Display the weather data
                document.getElementById('Weather').innerText = Weather: ${weatherDescription};
                document.getElementById('temperature').innerText = Temperature: ${temperature}°C;
            } else {
                alert('Weather data not found!');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
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

// Call getGeolocation when the page loads
getGeolocation();
