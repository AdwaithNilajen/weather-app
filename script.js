document.getElementById("weatherForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    
    const cityInput = document.getElementById("cityInput").value.trim();
    const weatherDisplay = document.getElementById("weatherDisplay");
    const apiKey = "f86f47f95ca85251d3c01d925d88843a"; 

    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    
    function updateTime() {
        const timeElement = document.getElementById("currentTime");
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        timeElement.textContent = now.toLocaleString("en-US", options);
    }

    try {
        
        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

       
        weatherDisplay.innerHTML = `
            <h3 class="weather-location">
                <i class="fa-solid fa-location-dot fa-beat"></i> Weather in ${data.name}
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" class="inline-block w-10 h-10 ml-2">
            </h3>
            <p id="currentTime" class="real-time"></p> <!-- Real-time clock container -->
            <p class="weather-temp">
                <i class="fa-solid fa-temperature-low fa-beat"></i> Temperature: ${data.main.temp} °C
            </p>
            <p class="weather-humidity">
                <i class="fa-solid fa-droplet fa-beat"></i> Humidity: ${data.main.humidity}%
            </p>
            <p class="weather-wind">
                <i class="fa-solid fa-wind fa-beat"></i> Wind Speed: ${data.wind.speed} m/s
            </p>
            <p class="weather-condition">
                Condition: ${data.weather[0].description}
            </p>
        `;

       
        updateTime(); 
        setInterval(updateTime, 1000); 

    } catch (error) {
        weatherDisplay.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
});
