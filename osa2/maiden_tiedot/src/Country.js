import React from 'react'

const Weather = ({ weatherData }) => {

  return (
    <div>
      <h3>Weather in {weatherData.location.name}</h3>
      <b>temperature:</b> {weatherData.current.temp_c} Celsius<br></br>
      <img src={weatherData.current.condition.icon} 
        alt={weatherData.current.condition.text}></img><br></br>
      <b>wind:</b> {weatherData.current.wind_kph} kph
      direction {weatherData.current.wind_dir}
    </div>
  )
}

const Country = ({ country, weatherData }) => {
  const languages = country.languages.map(language =>
    <li key={language.name}>
      {language.name}
    </li>  
  )
  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital} <br></br>
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={country.name} height='auto' width='60%'></img>

      <Weather weatherData={weatherData} />

    </div>
  )
}

export default Country