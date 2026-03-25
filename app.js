const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const locationBtn = document.getElementById("locationBtn");
const loader = document.getElementById("loader");

const appBg = document.getElementById("appBg");
const API_KEY = "cbcfc8645b87a83baadaa015a611471b";

// 🎨 Dynamic background
function updateBackground(weather) {
  if (weather.includes("cloud")) {
    appBg.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-white transition-all duration-500";
  } else if (weather.includes("rain")) {
    appBg.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-black text-white transition-all duration-500";
  } else if (weather.includes("clear")) {
    appBg.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-700 text-white transition-all duration-500";
  } else {
    appBg.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white transition-all duration-500";
  }
}

// ✅ UI update
function updateUI(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°`;
  description.textContent = data.weather[0].description;

  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  updateBackground(data.weather[0].main.toLowerCase());
}

// ✅ Fetch
async function fetchWeather(url) {
  try {
    loader.classList.remove("hidden");

    const res = await fetch(url);
    const data = await res.json();

    loader.classList.add("hidden");

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    updateUI(data);
  } catch (err) {
    loader.classList.add("hidden");
    console.error(err);
  }
}

// 🔍 Search
button.addEventListener("click", () => {
  const city = input.value.trim();

  if (!city) return alert("Enter city");

  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
});

// 📍 Location
locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;

    fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
  });
});

// 🚀 Auto load
window.addEventListener("load", () => {
  locationBtn.click();
});
