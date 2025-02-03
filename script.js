document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

function getWeather(position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log("Latitude:", lat, "Longitude:", lon); 

    const apiKey = '82e901d87b6700b1e0f00c5b30f0aba0';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data);
            let location = data.name;
            let country = data.sys.country;
            let description = data.weather[0].description;
            let temperature = data.main.temp;

            document.getElementById("weather").innerHTML = `
                <p><strong>${location}, ${country}</strong></p>
                <p>${description.toUpperCase()}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
