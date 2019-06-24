import React from 'react'

const Filter = ({ countryFilter, handleCountryFilter }) => {
  return (
    <div>
      find countries
      <input value={countryFilter} onChange={handleCountryFilter} />
    </div>
  )
}

export default Filter