let now = 0;
let formattedDate = 0;

function dispdatetime() {
    now = new Date();

    const day = now.getDate();
    const month = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    formattedDate = `${day} ${month} ${year}`; // Example: "25 January 2025"

    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    setdatetime(formattedDate, time);
}


const timedate = document.getElementById('timedatecontainer');
if (timedate) {
    function setdatetime(formattedDate, time) {
        timedate.innerHTML = `
            <h1 class="date">${formattedDate}</h1>
            <h3 class="time">${time}</h3>`;
    }
    dispdatetime();
} else {
    console.log("Error: timedatecontainer not found.");
}

const degreecelcius = document.getElementById('degreecelcius');
const humidity = document.getElementById('humid');
const windspeed = document.getElementById('wind');
const loc = document.getElementById('location');

const apikey = "8bf774f569453d272eac8096427c6be4";

async function fetchWeather(location) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Location not found or network error.");
        }
        const data = await response.json();
        console.log(data);
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

function updateWeather(data) {
    const { wind, main, weather, name } = data;

    degreecelcius.innerHTML = `
        <h5>${name}</h5>
        <h2>${main.temp}°C</h2>
        <h6>${weather[0].description}</h6>
    `;

    humidity.innerHTML = `
        <h3>Humidity: ${main.humidity}%</h3>
    `;

    windspeed.innerHTML = `
        <h3>Wind Speed: ${wind.speed} m/s</h3>
    `;
}

loc.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const location = loc.value.trim();
        if (location) {
            fetchWeather(location);
        }
    }
});