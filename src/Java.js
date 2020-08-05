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
    weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconId}@2x.png`
    );
    weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

    let currentWeather = `${response.data.weather[0].description}`;
    let itemSuggestion = document.querySelector("#friendly-advice");

    if (
        (currentWeather.includes("clear sky") || currentWeather.includes("sunny") || currentWeather.includes("sun") || currentWeather.includes("few clouds") ||
            currentWeather.includes("scattered clouds")) &&
        temperature >= 25
    ) {
        itemSuggestion.innerHTML = `Friendly advice - consider wearing a 👒, bringing sunscreen and 🕶️ along!`;
    } else if (
        (currentWeather.includes("clear sky") ||
            currentWeather.includes("sunny") ||
            currentWeather.includes("sun") ||
            currentWeather.includes("few clouds") ||
            currentWeather.includes("scattered clouds")) &&
        temperature < 25
    ) {
        itemSuggestion.innerHTML = `Friendly advice - it's not too hot but a 👒 and 🕶️ might come in handy!`;
    } else if (
        (currentWeather.includes("clear sky") ||
            currentWeather.includes("sunny") ||
            currentWeather.includes("sun") ||
            currentWeather.includes("few clouds") ||
            currentWeather.includes("scattered clouds")) &&
        temperature < 20
    ) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your 🕶️ this time!`;
    } else if (
        (currentWeather.includes("clear sky") ||
            currentWeather.includes("sunny") ||
            currentWeather.includes("sun") ||
            currentWeather.includes("few clouds") ||
            currentWeather.includes("broken clouds") ||
            currentWeather.includes("scattered clouds") ||
            currentWeather.includes("overcast clouds")) &&
        temperature < 15
    ) {
        itemSuggestion.innerHTML = `Friendly advice - perhaps it's time to layer up with a hoodie or jacket!`;
    } else if (currentWeather.includes("broken clouds") || currentWeather.includes("overcast clouds")) {
        itemSuggestion.innerHTML = `Friendly advice - guess you won't be needing 🕶️ anymore, maybe a light jacket for later!`;
    } else if (
        currentWeather.includes("light rain") ||
        currentWeather.includes("rain") ||
        currentWeather.includes("shower rain") ||
        currentWeather.includes("drizzle")
    ) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your ☂️ this time!`;
    } else if (
        (currentWeather.includes("light rain") ||
            currentWeather.includes("rain") ||
            currentWeather.includes("shower rain") ||
            currentWeather.includes("drizzle")) &&
        temperature < 20
    ) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your ☂️ and a rain coat might come in handy!`;
    } else if (currentWeather.includes("heavy rain") ||
        currentWeather.includes("moderate rain") || currentWeather.includes("heavy intensity rain") || currentWeather.includes("heavy")) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your ☂️, rain coat and boots 👢!`;

    } else if (currentWeather.includes("very heavy rain") || currentWeather.includes("extreme rain") || currentWeather.includes("ragged")) {
        itemSuggestion.innerHTML = `Friendly advice -perhaps staying indoors until it stops raining 🐈s and 🐕s is a good idea!`;
    } else if (currentWeather.includes("thunderstorm")) {
        itemSuggestion.innerHTML = `Friendly advice - if you must leave the house, wear rubber boots and a rain coat and stay away from conductors! `
    } else if (currentWeather.includes("snow") || currentWeather.includes("shower snow") || currentWeather.includes("light snow") || currentWeather.includes("shower snow") || currentWeather.includes("sleet")) {
        itemSuggestion.innerHTML = `Friendly advice - Don't forget your 🧣 and 🧤 to keep warm! Maybe you'll enjoy building a ⛄ or ⛷️ today if you have nothing planned 😉.`
    } else if (currentWeather.includes("rain and snow")) {
        itemSuggestion.innerHTML = `Friendly advice - the question here is, what don't you need? 🧣, 🧤 and an 🌂!`
    } else if (currentWeather.includes("heavy snow") || currentWeather.includes("heavy shower snow")) {
        itemSuggestion.innerHTML = `Friendly advice - Oh man, looks like you'll need that shove afterall 😅 ...`
    } else if (currentWeather.includes("smoke") || currentWeather.includes("fog") || currentWeather.includes("haze") || currentWeather.includes("dust") || currentWeather.includes("mist")) {
        itemSuggestion.innerHTML = `Friendly advice - If you're planning on driving, please bring a windshield wiper along. Otherwise, be more attentative 👀 when moving about as visibility is more limited. `
    } else if (currentWeather.includes("tornado") || currentWeather.includes("volcanic ash")) {
        itemSuggestion.innerHTML = `Friendly advice - ⚠️ please stay home for your own safety! ⚠️`;
    } else {
        itemSuggestion.innerHTML = `Oh boy oh boy, I'm afraid I'm out of suggestions, it's all up to you now! 🤭`

    }

    let maxTemp = document.querySelector("#max");
    maxTemp.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}ºC`;
    let minTemp = document.querySelector("#min");
    minTemp.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}ºC`;
    let hum = document.querySelector("#hum");
    hum.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let feels = document.querySelector("#feels-like");
    feels.innerHTML = `Feels like: ${Math.round(
        response.data.main.feels_like
    )}ºC`;
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

//Forecast

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function displayForecast(response) {
    let forecast = null;
    console.log(forecast);
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = "";
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += ` 
                <div class="col-2">
                            <h3> ${formatHours(forecast.dt * 1000)} </h3>
                            <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
            }@2x.png" alt="weather icon" />
                            <div class="forecast-temp">
                                <strong>${Math.round(
                forecast.main.temp_max
            )}º</strong>  ${Math.round(
                forecast.main.temp_min
            )}º
                            </div>
                </div>
        </div>`;
    }
    // forecastElement.innerHTML = `
    // <div class="row">
    //             <div class="col-6">
    //                 <ul class="list-group list-group-horizontal-md forecast">
    //                     <li class="list-group-item  bg-transparent">
    //                         <h3> ${formatHours(forecast.dt *1000)} </h3>
    //                         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather icon" />
    //                         <div class="forecast-temp">
    //                             <strong>${Math.round(forecast.main.temp_max)}º</strong>  ${Math.round(forecast.main.temp_min)}º
    //                         </div>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>`;
}

//City
function searchCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text");
    let city = document.querySelector("#city-name");
    city.innerHTML = `${searchInput.value}`;
    search(searchInput.value);
}

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);

// function changePicture(response) {
//     console.log(response.data);
//     let cityPhoto = document.querySelector("#country");
//     cityPhoto.setAttribute("src", apiUrlFour) =
// }


function search(city) {
    let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlTwo).then(showTemperature);
    let apiUrlThree = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlThree).then(displayForecast);
    let apiUrlFour = `https://source.unsplash.com/featured/?{city},${city}`;
    let cityPhoto = document.querySelector("#country");
    cityPhoto.setAttribute("src", apiUrlFour);

}

// var fah = 57;

//Unit conversion
function toFahrenheit(event) {
    event.preventDefault();
    let fah = (temperature * 9) / 5 + 32;
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

search("Paris");