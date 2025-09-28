const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const city = "Mumbai"; // Default city
// --- Main Weather Info ---
const main = document.getElementById('main');
const cityName = document.querySelector('.location-time h2');
const dateElement = document.querySelector('.location-time p:nth-of-type(1)'); // Selects the first <p> for date
const timeElement = document.querySelector('.location-time p:nth-of-type(2)'); // Selects the second <p> for time
const temperature = document.querySelector('.temp h1');
const weatherDescription = document.querySelector('.temp p');
const weatherIcon = document.querySelector('.icon img');

// --- "Other Info" Cards ---

// Feels Like
const feelsLikeValue = document.querySelector('.feelsLike p');
const feelsLikeIcon = document.querySelector('.feelsLike i'); // Icon ke liye (optional)

// Humidity
const humidityValue = document.querySelector('.humidity p');
const humidityIcon = document.querySelector('.humidity i');

// Wind Speed
const windSpeedValue = document.querySelector('.wind-speed p');
const windSpeedIcon = document.querySelector('.wind-speed i');

// Air Quality
const airQualityValue = document.querySelector('.air-quality p');
const airQualityIcon = document.querySelector('.air-quality i');

// --- Main Container (Background change karne ke liye) ---
const mainCard = document.querySelector('.main');

// Weather condition ke hisaab se background aur icon change karne ke liye object
const weatherStyles = {
    Thunderstorm: {
        icon: "⛈️",
        background: `
      radial-gradient(circle at 30% 20%, rgba(147, 197, 253, 0.25) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
      linear-gradient(160deg, #1E3A8A 0%, #3730A3 50%, #111827 100%)
    `,
        textColor: "#E5E7EB"
    },
    Drizzle: {
        icon: "🌦️",
        background: `
      radial-gradient(circle at 20% 30%, rgba(191, 219, 254, 0.3) 0%, transparent 60%),
      radial-gradient(circle at 70% 80%, rgba(147, 197, 253, 0.25) 0%, transparent 50%),
      linear-gradient(150deg, #60A5FA 0%, #2563EB 100%)
    `,
        textColor: "#1E293B"
    },
    Rain: {
        icon: "🌧️",
        background: `
      radial-gradient(circle at 40% 30%, rgba(71, 85, 105, 0.9) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(51, 65, 85, 0.7) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(30, 41, 59, 0.8) 0%, transparent 55%),
      linear-gradient(150deg, #334155 0%, #475569 20%, #64748B 40%, #334155 60%, #1E293B 80%, #0F172A 100%)
    `,
        textColor: "#1E293B"
    },
    Snow: {
        icon: "❄️",
        background: `
      radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(209, 213, 219, 0.6) 0%, transparent 50%),
      linear-gradient(145deg, #E0EAFC 0%, #CFDEF3 100%)
    `,
        textColor: "#1E293B"
    },
    Mist: {
        icon: "🌫️",
        background: `
      radial-gradient(circle at 40% 40%, rgba(148, 163, 184, 0.5) 0%, transparent 55%),
      radial-gradient(circle at 70% 60%, rgba(100, 116, 139, 0.4) 0%, transparent 45%),
      linear-gradient(145deg, #606c88 0%, #3f4c6b 100%)
    `,
        textColor: "#1E293B"
    },
    Smoke: {
        icon: "🌫️",
        background: `
      radial-gradient(circle at 40% 40%, rgba(148, 163, 184, 0.5) 0%, transparent 55%),
      radial-gradient(circle at 70% 60%, rgba(100, 116, 139, 0.4) 0%, transparent 45%),
      linear-gradient(145deg, #606c88 0%, #3f4c6b 100%)
    `,
        textColor: "#1E293B"
    },
    Haze: {
        icon: "🌫️",
        background: `
      radial-gradient(circle at 40% 40%, rgba(148, 163, 184, 0.5) 0%, transparent 55%),
      radial-gradient(circle at 70% 60%, rgba(100, 116, 139, 0.4) 0%, transparent 45%),
      linear-gradient(145deg, #606c88 0%, #3f4c6b 100%)
    `,
        textColor: "#1E293B"
    },
    Dust: {
        icon: "🌪️",
        background: `
      radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.35) 0%, transparent 60%),
      radial-gradient(circle at 70% 70%, rgba(180, 83, 9, 0.25) 0%, transparent 50%),
      linear-gradient(140deg, #B79891 0%, #94716B 100%)
    `,
        textColor: "#F1F5F9"
    },
    Sand: {
        icon: "🌪️",
        background: `
      radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.35) 0%, transparent 60%),
      radial-gradient(circle at 70% 70%, rgba(180, 83, 9, 0.25) 0%, transparent 50%),
      linear-gradient(140deg, #B79891 0%, #94716B 100%)
    `,
        textColor: "#F1F5F9"
    },
    Ash: {
        icon: "🌪️",
        background: `
      radial-gradient(circle at 40% 50%, rgba(107, 114, 128, 0.5) 0%, transparent 55%),
      radial-gradient(circle at 70% 70%, rgba(55, 65, 81, 0.4) 0%, transparent 45%),
      linear-gradient(140deg, #6B7280 0%, #374151 100%)
    `,
        textColor: "#F1F5F9"
    },
    Squall: {
        icon: "🌪️",
        background: `
      radial-gradient(circle at 30% 40%, rgba(37, 99, 235, 0.25) 0%, transparent 55%),
      radial-gradient(circle at 60% 80%, rgba(59, 130, 246, 0.25) 0%, transparent 45%),
      linear-gradient(150deg, #0f2027 0%, #203A43 50%, #2C5364 100%)
    `,
        textColor: "#F1F5F9"
    },
    Tornado: {
        icon: "🌪️",
        background: `
      radial-gradient(circle at 30% 40%, rgba(37, 99, 235, 0.25) 0%, transparent 55%),
      radial-gradient(circle at 60% 80%, rgba(59, 130, 246, 0.25) 0%, transparent 45%),
      linear-gradient(150deg, #0f2027 0%, #203A43 50%, #2C5364 100%)
    `,
        textColor: "#F1F5F9"
    },
    Clear: {
        icon: "☀️",
        background: `
      radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
      linear-gradient(145deg, #56CCF2 0%, #2F80ED 100%)
    `,
        textColor: "#1E293B"
    },
    Clouds: {
        icon: "☁️",
        background: `
      radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(209, 213, 219, 0.5) 0%, transparent 50%),
      linear-gradient(145deg, #757F9A 0%, #D7DDE8 100%)
    `,
        textColor: "#1E293B"
    }
};



//API FETCH
const apikey = '5231a61f5e9667c5356ef7b4834e3016';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    let data = await response.json();
    console.log(data);
    cityName.textContent = data.name + ", " + data.sys.country;
    dateElement.textContent = new Date().toLocaleDateString();
    timeElement.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    temperature.textContent = Math.round(data.main.temp) + "°C";
    weatherDescription.textContent = data.weather[0].main;
    feelsLikeValue.textContent = Math.round(data.main.feels_like) + "°C";
    humidityValue.textContent = data.main.humidity + "%";
    windSpeedValue.textContent = data.wind.speed + " m/s";

    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const aqiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`
    );
    let aqiData = await aqiResponse.json();
    console.log(aqiData);

    const aqi = aqiData.list[0].main.aqi;
    let aqiText = "";
    let qualityColor = "";
    let textColor = "#fff"; // default text color

    switch (aqi) {
        case 1:
            aqiText = "🌿 Crystal Clear";
            qualityColor = "linear-gradient(135deg, #56ab2f, #a8e063)";
            textColor = "#ffffff";
            break;
        case 2:
            aqiText = "🌤️ Breezy Fair";
            qualityColor = "linear-gradient(135deg, #fceabb, #f8b500)";
            textColor = "#333333";
            break;
        case 3:
            aqiText = "🌆 Urban Haze";
            qualityColor = "linear-gradient(135deg, #f7971e, #ffd200)";
            textColor = "#000000";
            break;
        case 4:
            aqiText = "🚨 Health Risk";
            qualityColor = "linear-gradient(135deg, #ff512f, #dd2476)";
            textColor = "#ffffff";
            break;
        case 5:
            aqiText = "☠️ Toxic Air";
            qualityColor = "linear-gradient(135deg, #654ea3, #eaafc8)";
            textColor = "#ffffff";
            break;
        default:
            aqiText = "❓ Unknown";
            qualityColor = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    }

    airQualityValue.textContent = aqiText;

    // AQI container ko gradient background do
    const aqiBox = document.querySelector(".air-quality");
    aqiBox.style.background = qualityColor;
    aqiBox.style.color = textColor;
    aqiBox.style.fontWeight = "600";
    aqiBox.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";

    // Change background and icon based on weather condition
    const currentWeather = data.weather[0].main;
    const style = weatherStyles[currentWeather];
    main.style.background = style.background;
    main.style.color = style.textColor;
    weatherIcon.src = `/assets/img/${data.weather[0].main}.svg`;
    document.body.style.background = style?.background;
}
checkWeather(city);

searchBtn.addEventListener("click", function () {
    if (cityInput.value !== "") {
        const searchedCity = cityInput.value;
        cityInput.value = "";
        cityName.textContent = searchedCity
        checkWeather(searchedCity);
    }
});