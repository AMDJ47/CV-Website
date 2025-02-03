function fetchWeather(latitude, longitude) {
    const weatherUrl = https://wttr.in/${latitude},${longitude}?format=j1;

    console.log(Fetching weather for coordinates: ${latitude}, ${longitude});

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Weather API response:", data); // Debugging line

            const weatherData = data.current_condition[0];
            const location = ${latitude.toFixed(2)}, ${longitude.toFixed(2)};
            const weatherDescription = weatherData.weatherDesc[0].value;
            const temperature = weatherData.temp_C; // Temperature in Celsius

            // Display the weather data
            document.getElementById('location').innerText = Location: ${location};
            document.getElementById('Weather').innerText = Weather: ${weatherDescription};
            document.getElementById('temperature').innerText = Temperature: ${temperature}°C;
        });
}

function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(Geolocation retrieved: Latitude ${latitude}, Longitude ${longitude});

            fetchWeather(latitude, longitude);
        });
    }
}
getGeolocation();
