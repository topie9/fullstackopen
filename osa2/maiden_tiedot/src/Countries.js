import React from 'react'

const Countries = ({ countries, handleCountryFilter }) => {
/* Handles showing countries by using simple if/else structure.
** When 1-10 countries shown as list, pressing the button simply
** changes the "find countries" filter text to clicked country.
*/
  const count = countries.length
  let result = ''

  if(count > 10) {
    result = 'Too many matches, specify another filter'
  }
  else if(count <= 10 && count > 1) {
    result = countries.map(country =>
      <div key={country.name}>
        {country.name}
        <button onClick={handleCountryFilter} value={country.name}>show</button>
      </div>  
    )
  }

  return (
    <div>
      {result}
    </div>
  )
}

export default Countries