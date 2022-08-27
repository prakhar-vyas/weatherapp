//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
let container = document.querySelector(".container");
let city = document.getElementById("city");
let inputfield = document.getElementById("city");
let infotext = document.getElementById("info");
let weatherPart = container.querySelector(".weather-part");
let wIcon = weatherPart.querySelector("img");
let locationBtn = document.getElementById("btn");
let arrowBack = container.querySelector("header i");
const api = "9d4c6e70472f2d25c3f447056ae2a63a";

//BY CITY SEARCH
function bycity() {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${api}`;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      weatherDetails(data);
      if (data.cod === "404") {
        infotext.innerText = `${city.value} is not a valid city`;
        infotext.classList.add("error");
      }
    });
}

//    Event occur when enter is pressed.
city.addEventListener("keypress", (event) => {
  if (event.key == "Enter" && inputfield.value != "") {
    event.preventDefault();
    bycity();
    infotext.innerText = "";
    infotext.classList.remove("error");
  }
});

//BY CURRENT LOCATION SEARCH STARTS

function bylatlon() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (showposition = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        bylocation(lat, lon);
      })
    );
  } else {
    alert("This features is not supported by your browser.");
  }
}

function bylocation(lat, lon) {
  let url = ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`;
  fetch(url)
    .then((loc_result) => {
      return loc_result.json();
    })
    .then((data) => {
      weatherDetails(data);
    });
}

//Weather Display
function weatherDetails(info) {
  if (info.cod == "404") {
    infotext.innerText = `${city.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    if (id == 800) {
      wIcon.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "icons/rain.svg";
    }

    weatherPart.querySelector(".temp .numb").innerText = temp;
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infotext.innerText = "";
    inputfield.value = "";
    container.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  container.classList.remove("active");
});
