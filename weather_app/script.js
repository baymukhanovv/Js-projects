const apiKey = "2cd95b6e598abf047fe17cbf057abe97"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchInput = document.querySelector('.search-city')
const searchBtn = document.querySelector('.search-btn')
const weatherImage = document.querySelector('.weather-img')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json()
    console.log(data)

    try {
        if(data.weather[0].main === 'Clouds') {
        weatherImage.src = 'images/clouds.png'
        } else if(data.weather[0].main === 'Clear') {
            weatherImage.src = 'images/clear.png'
        } else if(data.weather[0].main === 'Drizzle') {
            weatherImage.src = 'images/drizzle.png'
        } else if(data.weather[0].main === 'Mist') {
            weatherImage.src = 'images/mist.png'
        } else if(data.weather[0].main === 'Rain') {
            weatherImage.src = 'images/rain.png'
        } else if(data.weather[0].main === 'Snow') {
            weatherImage.src = 'images/snow.png'
        }

        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.error').style.display = 'none'
    } catch(e) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    }

    document.querySelector('.city').textContent = data.name
    document.querySelector('.temperature').textContent = Math.round(data.main.temp) + '°C'
    document.querySelector('.humidity').textContent = data.main.humidity + '%'
    document.querySelector('.wind').textContent = Math.round(data.wind.speed) + ' km/h'
    document.querySelector('.feels-like').textContent = 'Feels Like: ' + Math.floor(data.main.feels_like) + '°C'
    document.querySelector('.min-temp').textContent = 'Min Temp: ' + Math.floor(data.main.temp_min) + '°C'
    document.querySelector('.max-temp').textContent = 'Max Temp: ' + Math.ceil(data.main.temp_max) + '°C'
    
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchInput.value)
})
