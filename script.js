documen.addEventListener('DOMContentLoad',()=>
const loacationElement = doument.getElementById('location');
const weatherElement = Document.getElementById('weather');

const API_Key = '39ea3e45ab104c9db4286fe3281d54fe';
fetch('https://ipapi.co/json/')
.then(response => response.json())
.then data(=> {
  const{ city,country_name,latitude, longitude} = data;
locationElement.textontent = Location: ${city}, ${country_name};

Fetch('hhtps://api.geoapify.com/v1?weather/current?lat=$(latitide}&lon=${longitude}&apiKey{39ea3e45ab104c9db4286fe3281d54fe')
.then(response => response.json())
.then(weatherdData => {
  const temperature = weatherData.properties.temperature;
  const description = weatherData.properties.weather.description;

  weatherElement.tectContentv='Weather: ${temperture} degrees celcius, ${description}';
});
.catch(() =>{
  weatherElement.textContent = 'Unable to fetch weather data.';
});

})
.catch(() => {
  locationElement.textContent = 'Unable to fecth location data.';
});
  

  
