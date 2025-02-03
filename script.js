function fetchWeather(latitude, longitude) {
    const weatherUrl = https://wttr.in/${latitude},${longitude}?format=j1;

    fetch(weatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const weatherData = data.current_condition[0];
            const location = ${latitude.toFixed(2)}, ${longitude.toFixed(2)};
            const weatherDescription = weatherData.weatherDesc[0].value;
            const temperature = weatherData.temp_C;
            document.getElementById('location').innerText = 'Location: ${location}';
            document.getElementById('Weather').innerText = 'Weather: ${weatherDescription}';
            document.getElementById('temperature').innerText = 'Temperature: ${temperature}°C';
        });
}
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeather(latitude, longitude);
        });
    }
}
getGeolocation();
