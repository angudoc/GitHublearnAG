async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "ed9b17b70410d81449b37bff954bf4b9"; // Вставьте ваш API-ключ
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;

    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = "⏳ Загружаем данные...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const description = data.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherResult.innerHTML = `
                <h2>🌍 ${city}</h2>
                <img src="${icon}" alt="${description}">
                <p><strong>Температура:</strong> ${temp}°C (ощущается как ${feelsLike}°C)</p>
                <p><strong>Влажность:</strong> ${humidity}%</p>
                <p><strong>Скорость ветра:</strong> ${windSpeed} м/с</p>
                <p><strong>Описание:</strong> ${description}</p>
            `;
        } else {
            weatherResult.innerHTML = `<p>❌ Город не найден! Проверьте название и попробуйте ещё раз.</p>`;
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>⚠️ Ошибка загрузки данных. Попробуйте позже.</p>`;
    }
}
