import React from 'react'

const PhoneNumbers = ({ persons }) => {
  const numbers = persons.map(person => 
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  )
  return (
    <div>
      {numbers}
    </div>
  )
}

export default PhoneNumbers