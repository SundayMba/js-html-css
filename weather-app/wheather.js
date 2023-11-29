const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const city = "new york";
const apikey = "a4db38eb81b0c028caca64dafd8ffb89";

const testInputElement = document.querySelector('.js-input');
const searchbtn = document.querySelector('.js-search-btn');
const tempElement = document.querySelector('.js-temp');
const speedElement = document.querySelector('.js-wind-speed');
const humElement = document.querySelector('.js-humidity');
const cloudElement = document.querySelector('.js-cloud')
const errorElement = document.querySelector('.error');
const weatherBody = document.querySelector('.weather-info-container');

async function fetch_wheather(apikey, city)
{
  const response = await fetch(apiurl + `&appid=${apikey}&q=${city}`);

  if (response.status === 404)
  {
    errorElement.setAttribute('style', 'display: block');
    weatherBody.setAttribute('style', 'display: none');
    testInputElement.value = ''
  }
  else{
    const data = await response.json();
    console.log(data);
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windspeed = data.wind.speed;
    const cloud = data.weather[0].main;
    document.querySelector('.js-city').innerHTML = data.name;
    selectElement(windspeed, temp, humidity, cloud);    
    weatherBody.setAttribute('style', 'display: block');
    testInputElement.value = ''
    errorElement.setAttribute('style', 'display: none');
  }
}

function selectElement(speed, temp, hum, cloud)
{
  tempElement.innerHTML = Math.round(temp) + `&degC`;
  speedElement.innerHTML = speed + `kmph`;
  humElement.innerHTML = Math.round(hum) + `%`;
  cloudElement.setAttribute('src', `images/${cloud.toLowerCase()}.png`)
}

/** hanlde search feature */

searchbtn.addEventListener('click', () => {
  const testInputElement = document.querySelector('.js-input');
  fetch_wheather(apikey, testInputElement.value);
  testInputElement.value = ''
})

document.body.addEventListener('keypress', (event) => {
  errorElement.style.display = "none";
  if (event.key == "Enter")
  {
    fetch_wheather(apikey, testInputElement.value);
    testInputElement.value = ''
  }
})

fetch_wheather(apikey, "Amassoma");