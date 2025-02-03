document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon); 

    const apiKey = "1395d04198d15dc41b08a2e7ab20be63";
    const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const location = data.name;
            const country = data.sys.country;
            const description = data.weather[0].description;
            const temperature = data.main.temp;

            document.getElementById("weather").innerHTML = `
                <h2>${location}, ${country}</h2>
                <p>${description.toUpperCase()}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
        })
        .catch((error) => console.error("Error:", error));
}
