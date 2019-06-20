import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './PersonForm.js'
import PhoneNumbers from './PhoneNumbers.js'
import Filter from './Filter.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => (setNewName(event.target.value))
  const handleNumberChange = (event) => (setNewNumber(event.target.value))
  const handlePersonFilter = (event) => (setPersonFilter(event.target.value))
  
  const personsToShow = personFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={personFilter}
        handlePersonFilter={handlePersonFilter} 
      />

      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <PhoneNumbers persons={personsToShow} />
    </div>
  )
}

export default App