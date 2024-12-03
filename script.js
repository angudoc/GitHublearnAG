async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "ed9b17b70410d81449b37bff954bf4b9"; // Вставьте ваш ключ API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;

    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = "⏳ Загружаем данные...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherResult.innerHTML = `
                <h2>🌍 Погода в ${city}</h2>
                <img src="${icon}" alt="${description}">
                <p>Температура: ${temp}°C</p>
                <p>Описание: ${description}</p>
            `;
        } else {
            weatherResult.innerHTML = `<p>❌ Город не найден! Проверьте название и попробуйте ещё раз.</p>`;
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>⚠️ Ошибка загрузки данных. Попробуйте позже.</p>`;
    }
}
