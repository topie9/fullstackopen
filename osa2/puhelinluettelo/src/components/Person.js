import React from 'react'

const Person = ({ name, number, delPerson }) => {

  return (
    <div>
      {name} {number}
      <button onClick={delPerson}>delete</button>
    </div>
  )
}

export default Person