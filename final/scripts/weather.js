// weather.js – Fetch and display 5‑day forecast
const apiKey = '96d97f068e64a8507712aa395d817433';
const lat = '6.322931567819658';
const lon = '8.112586973869954';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

export async function loadWeather() {
    const container = document.getElementById('weather-container');
    if (!container) return;

    try {
        container.innerHTML = '<div class="loading">🌤️ Loading weather...</div>';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        displayWeather(container, data);
    } catch (error) {
        console.error('Weather fetch failed:', error);
        container.innerHTML = '<div class="error">⚠️ Unable to load weather.</div>';
    }
}

function displayWeather(container, data) {
    const list = data.list;
    if (!list || list.length === 0) {
        container.innerHTML = '<div class="error">No weather data available.</div>';
        return;
    }

    // Current weather (first 3‑hour interval)
    const current = list[0];

    // Next 3 unique days for forecast
    const daily = [];
    const seenDates = new Set();
    for (let item of list) {
        const date = item.dt_txt.split(' ')[0];
        if (!seenDates.has(date)) {
            seenDates.add(date);
            daily.push(item);
        }
        if (daily.length >= 4) break; // current + 3 forecast = 4 total
    }
    // Remove the first day if it's the same as current day
    const forecastDays = daily.filter(day => day.dt_txt.split(' ')[0] !== current.dt_txt.split(' ')[0]).slice(0, 3);

    let html = `
        <div class="current-weather">
            <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}">
            <div>
                <div class="temperature">${Math.round(current.main.temp)}°F</div>
                <div class="condition">${current.weather[0].description}</div>
                <div class="humidity">💧 Humidity: ${current.main.humidity}%</div>
                <div class="wind">💨 Wind: ${Math.round(current.wind.speed)} mph</div>
            </div>
        </div>
        <div class="forecast">
            <h4>3‑Day Forecast</h4>
            <div class="forecast-grid">
    `;

    forecastDays.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        html += `
            <div class="forecast-day">
                <span class="forecast-day-name">${dayName}</span>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                <span class="forecast-temp">${Math.round(day.main.temp)}°F</span>
                <span class="forecast-condition">${day.weather[0].description}</span>
            </div>
        `;
    });

    html += `
            </div>
            <p class="weather-attribution">Weather data: OpenWeatherMap</p>
        </div>
    `;

    container.innerHTML = html;
}

// Auto-run if container exists
if (document.getElementById('weather-container')) {
    loadWeather();
}