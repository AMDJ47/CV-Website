document.addEventListener('DOMContentLoad',()=>
const locationElement = document.getElementById('location');
const weatherElement = document.getElementById('weather');

const API_Key = '39ea3e45ab104c9db4286fe3281d54fe';
fetch('https://ipapi.co/json/')
.then(response => response.json())
.then data(=> {
  const{ city,country_name,latitude, longitude} = data;
locationElement.textContent = Location: ${city}, ${country_name};

Fetch('https://api.geoapify.com/v1/weather/current?lat=$(latitude}&lon=${longitude}&apiKey{39ea3e45ab104c9db4286fe3281d54fe')
.then(response => response.json())
.then(weatherdData => {
  const temperature = weatherData.properties.temperature;
  const description = weatherData.properties.weather.description;

  weatherElement.textContent='Weather: ${temperature} degrees celcius, ${description}';
});
.catch(() =>{
  weatherElement.textContent = 'Unable to fetch weather data.';
});

})
.catch(() => {
  locationElement.textContent = 'Unable to fecth location data.';
});
  

  
