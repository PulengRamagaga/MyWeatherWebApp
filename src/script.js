const apiKey = 'fc22e36e1366127fcbfca696b0bb077a';

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

async function fetchForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('weather-description').innerText = data.weather[0].description;
    document.getElementById('temp-value').innerText = Math.round(data.main.temp);
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind: ${data.wind.speed} km/h`;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';

    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyData.forEach(day => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p>${day.weather[0].description}</p>
            <p>${Math.round(day.main.temp_max)}° / ${Math.round(day.main.temp_min)}°</p>
        `;
        forecastDiv.appendChild(div);
    });
}

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) return;

    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);

    const forecastData = await fetchForecast(city);
    displayForecast(forecastData);
});
