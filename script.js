// Weather and Location functionality
async function getLocationAndWeather() {
  const locationElement = document.getElementById("location")
  const weatherElement = document.getElementById("weather")
  const temperatureElement = document.getElementById("temperature")
  const countryElement = document.getElementById("country")

  try {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          try {
            // Get location name from coordinates
            const locationResponse = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
            )
            const locationData = await locationResponse.json()

            locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span>${locationData.city || locationData.locality || "Unknown City"}</span>`
            countryElement.innerHTML = `<i class="fas fa-flag"></i> <span>${locationData.countryName || "Unknown Country"}</span>`

            // Get weather data
            const weatherResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`,
            )
            const weatherData = await weatherResponse.json()

            if (weatherData.current_weather) {
              const weather = weatherData.current_weather
              const weatherCode = weather.weathercode
              const weatherDescription = getWeatherDescription(weatherCode)

              weatherElement.innerHTML = `<i class="fas fa-cloud"></i> <span>${weatherDescription}</span>`
              temperatureElement.innerHTML = `<i class="fas fa-thermometer-half"></i> <span>${Math.round(weather.temperature)}°C</span>`
            }
          } catch (error) {
            console.error("Error fetching weather data:", error)
            weatherElement.innerHTML = `<i class="fas fa-cloud"></i> <span>Weather data unavailable</span>`
            temperatureElement.innerHTML = `<i class="fas fa-thermometer-half"></i> <span>--°C</span>`
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
          locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span>Location access denied</span>`
          countryElement.innerHTML = `<i class="fas fa-flag"></i> <span>--</span>`
          weatherElement.innerHTML = `<i class="fas fa-cloud"></i> <span>Weather unavailable</span>`
          temperatureElement.innerHTML = `<i class="fas fa-thermometer-half"></i> <span>--°C</span>`
        },
      )
    } else {
      locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span>Geolocation not supported</span>`
      countryElement.innerHTML = `<i class="fas fa-flag"></i> <span>--</span>`
      weatherElement.innerHTML = `<i class="fas fa-cloud"></i> <span>Weather unavailable</span>`
      temperatureElement.innerHTML = `<i class="fas fa-thermometer-half"></i> <span>--°C</span>`
    }
  } catch (error) {
    console.error("Error in getLocationAndWeather:", error)
    locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span>Error loading location</span>`
    countryElement.innerHTML = `<i class="fas fa-flag"></i> <span>--</span>`
    weatherElement.innerHTML = `<i class="fas fa-cloud"></i> <span>Error loading weather</span>`
    temperatureElement.innerHTML = `<i class="fas fa-thermometer-half"></i> <span>--°C</span>`
  }
}

// Weather code to description mapping
function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  }

  return weatherCodes[code] || "Unknown weather"
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Initialize weather and location
  getLocationAndWeather()

  // Smooth scrolling for navigation
  const navLinks = document.querySelectorAll('nav a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100 // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add scroll effect to navigation
  let lastScrollTop = 0
  const nav = document.querySelector("nav")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      nav.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      nav.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all cards
  document.querySelectorAll(".card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1")
  const originalText = heroTitle.textContent
  typeWriter(heroTitle, originalText, 50)
})

// Add click tracking for analytics (optional)
function trackClick(element, action) {
  // This can be connected to Google Analytics or other tracking services
  console.log(`Clicked: ${action} on ${element}`)
}

// Add click handlers for external links
document.addEventListener("DOMContentLoaded", () => {
  const externalLinks = document.querySelectorAll('a[target="_blank"]')
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      trackClick(this.href, "external_link")
    })
  })
})
