const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const locationBtn = document.getElementById("locationBtn");
const loader = document.getElementById("loader");

const API_KEY = "cbcfc8645b87a83baadaa015a611471b";

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        loader.classList.remove("hidden");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        );

        const data = await response.json();

        loader.classList.add("hidden");

        if (data.cod !== 200) {
          alert(data.message);
          return;
        }

        // Update UI
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      } catch (error) {
        loader.classList.add("hidden");
        console.error(error);
      }
    });
  } else {
    alert("Geolocation not supported");
  }
});
