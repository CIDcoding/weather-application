let apiKey = `f2b4d9400514fb45f2f01024e2f5b1e0`;

//Date and Time
function formatDate(currentDate) {
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let date = currentDate.getDate();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let dateTitle = document.querySelector("#date");
    let changeDate = `${day}, ${date} ${month}`;
    dateTitle.innerHTML = changeDate;
    let time = document.querySelector("#time");
    let changeTime = `${hour}:${minutes}`;
    time.innerHTML = changeTime;
}

let now = new Date();
formatDate(now);

//Temperature
var temperature = 0;

function showTemperature(response) {
    console.log(response.data);
    temperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector("#current-temp");
    currentTemperature.innerHTML = `${temperature}`;
    let city = document.querySelector("#city-name");
    city.innerHTML = `${response.data.name}`;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = `${response.data.weather[0].description}`;
    let weatherIcon = document.querySelector("#description-icon");
    let iconId = response.data.weather[0].icon;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);
    weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

    let currentWeather = `${response.data.weather[0].description}`;
    let itemSuggestion = document.querySelector("#friendly-advice");
    if ((currentWeather === "clear sky" || currentWeather === "sunny" || currentWeather === "sun") && temperature >= 25) {
        itemSuggestion.innerHTML = `Friendly advice - consider wearing a 👒, bringing sunscreen and 🕶️ along!`

    } else if ((currentWeather === "clear sky" || currentWeather === "sunny" || currentWeather === "sun") && 20 < temperature < 25) {
        itemSuggestion.innerHTML = `Friendly advice - it's not too hot but a 👒 and 🕶️ might come in handy!`

    } else if ((currentWeather === "clear sky" || currentWeather === "sunny" || currentWeather === "sun") && temperature < 20) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your 🕶️ this time!`

    } else if ((currentWeather === "clear sky" || currentWeather === "sunny" || currentWeather === "sun") && temperature < 15) {
        itemSuggestion.innerHTML = `Friendly advice - perhaps it's time to layer up with a hoodie or jacket!`
    } else if ((currentWeather === "light rain" || currentWeather === "rain" || currentWeather === "showers")) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your ☂️ this time!`
    } else if ((currentWeather === "light rain" || currentWeather === "rain" || currentWeather === "showers") && temperature < 20) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your ☂️ and a light coat might come in handy!`
    } else if (currentWeather === "heavy rain") {
        itemSuggestion.innerHTML = `Friendly advice -perhaps staying indoors until it stops raining 🐈s and 🐕s is a good idea!`
    }

    let maxTemp = document.querySelector("#max");
    maxTemp.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}ºC`;
    let minTemp = document.querySelector("#min");
    minTemp.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}ºC`;
    let hum = document.querySelector("#hum");
    hum.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let feels = document.querySelector("#feels-like");
    feels.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}ºC`;
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = `Wind speed: ${response.data.wind.speed}mph`;
    // let chanceOfRain = document.querySelector("#rain");
    // chanceOfRain.innerHTML = `Chance of rain: ${response.data.rain["1h"] * 100}%`
}

//Location
function myLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getPosition);

//City
function searchCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text");
    let city = document.querySelector("#city-name");
    city.innerHTML = `${searchInput.value}`;
    let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlTwo).then(showTemperature);
}

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);

// var fah = 57;

//Unit conversion
function toFahrenheit(event) {
    event.preventDefault();
    let fah = (temperature * 9 / 5) + 32;
    fah = Math.round(fah);
    let currentTemp = document.querySelector("#current-temp");
    tempCelcius.classList.remove("active");
    tempFahrenheit.classList.add("active");

    currentTemp.innerHTML = `${fah}`;
}

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", toFahrenheit);

function toDegrees(event) {
    event.preventDefault();
    // let deg = ((fah - 32) * 5) / 9;
    // deg = Math.round(deg);
    let currentTemp = document.querySelector("#current-temp");
    tempCelcius.classList.add("active");
    tempFahrenheit.classList.remove("active");
    currentTemp.innerHTML = `${temperature}`;
}

let tempCelcius = document.querySelector("#celcius");
tempCelcius.addEventListener("click", toDegrees);

searchCity("Paris")