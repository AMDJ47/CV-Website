/ Function to fetch weather based on latitude and longitude using WeatherAPI
function fetchWeather(latitude, longitude) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key if needed
    const weatherUrl = https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no;

    console.log(Fetching weather for coordinates: ${latitude}, ${longitude});

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(HTTP error! Status: ${response.status});
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather API response:", data); // Debugging line

            if (data.location && data.current) {
                const location = data.location.name;               // Location name
                const weatherDescription = data.current.condition.text; // Weather description
                const temperature = data.current.temp_c;           // Temperature in Celsius

                // Display the weather data
                document.getElementById('location').innerText = Location: ${location};
                document.getElementById('Weather').innerText = Weather: ${weatherDescription};
                document.getElementById('temperature').innerText = Temperature: ${temperature}°C;
            } else {
                alert('Weather data not found!');
                console.log("Missing data:", data);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to get the user's current geolocation
function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(Geolocation retrieved: Latitude ${latitude}, Longitude ${longitude});

                fetchWeather(latitude, longitude);
            },
            function (error) {
                console.error("Error getting location:", error);
                alert("Failed to retrieve your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Call getGeolocation when the page loads
getGeolocation();
