import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './Filter.js'
import Countries from './Countries.js'
import Country from './Country.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [oneCountry, setOneCountry] = useState('')
  const [isGettingWeather, setIsGettingWeather] = useState(true)
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    // if to prevent useEffect in first render when oneCountry is empty
    if(oneCountry) {
      setIsGettingWeather(true)
      const key = '2b3c0c9129fa4c0186a151059192406'

      axios
        .get(`https://api.apixu.com/v1/current.json?key=${key}&q=${oneCountry.capital}`)
        .then(response => {
          setWeatherData(response.data)
          setIsGettingWeather(false)
        })
    }
  }, [oneCountry])

  const handleCountryFilter = (event) => (setCountryFilter(event.target.value))

  // set filtered country list to empty list[] if filter is empty string
  const filtered = (countryFilter !== '')
    ? countries.filter(country =>
        country.name.toLowerCase().includes(countryFilter.toLowerCase())
      )
    : []
  
  // to get weather data only when 1 country is being shown
  // and to prevent useState infinite looping
  if(filtered.length === 1 && filtered[0] !== oneCountry) {
    setOneCountry(filtered[0])
  }

  // Show list of countries if more than 1 or show 1 country with weather.
  // Small flicker can be seen when switching from "Loading..." to country
  // If weather data can't be fetched won't show any data about country.
  const showCountry = (filtered.length !== 1)
    ? <Countries 
        countries={filtered}
        handleCountryFilter={handleCountryFilter}
      />
    : (isGettingWeather) 
      ? <div>Loading...</div>
      : <Country 
          country={filtered[0]}
          weatherData={weatherData}
        />

  return (
    <div>
      <Filter 
        countryFilter={countryFilter}
        handleCountryFilter={handleCountryFilter}
      />
      {showCountry}
    </div>
  )
}

export default App;