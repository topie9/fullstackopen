import React from 'react'

const Filter = ({ personFilter, handlePersonFilter }) => {
  return (
    <div>
    filter shown with
    <input value={personFilter} onChange={handlePersonFilter} />
    </div>
  )
}

export default Filter