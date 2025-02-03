document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

function getWeather(position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(lat, lon); 

    const apiKey = '82e901d87b6700b1e0f00c5b30f0aba0';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let location = data.name;
            let country = data.sys.country;
            let description = data.weather[0].description;
            let temperature = data.main.temp;

            document.getElementById("weather").innerHTML = `
                <p><strong>${location}, ${country}</strong></p>
                <p>${description.toUpperCase()}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
        })
        .catch((error) => console.error("Error:", error));
}
