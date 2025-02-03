console.log("Script is running...");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const weatherUrl = https://wttr.in/${latitude},${longitude}?format=j1;

        fetch(weatherUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
              

                const weatherData = data.current_condition[0];
                const weatherDescription = weatherData.weatherDesc[0].value;
                const temperature = weatherData.temp_C;

                document.getElementById('location').innerText = Latitude: ${latitude}, Longitude: ${longitude};
                document.getElementById('Weather').innerText = Weather: ${weatherDescription};
                document.getElementById('temperature').innerText = Temperature: ${temperature}°C;
            });
    });
} else {
    console.log("Geolocation is not supported.");
}
