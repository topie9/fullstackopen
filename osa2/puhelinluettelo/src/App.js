import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.js'
import Person from './components/Person.js'
import Filter from './components/Filter.js'
import personService from './services/persons.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personFound = persons.find(person => person.name === newName)
    if (personFound) {
      updatePerson(personFound)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log('create person failed:', error)
          })
    }
  }

  const updatePerson = (personFound) => {
    const dialog = `${personFound.name} is already added to phonebook, replace the old number with a new one?`
    const confirmUpdate = window.confirm(dialog)

    if (confirmUpdate) {
      const changedPerson = { ...personFound, number: newNumber}
      personService
        .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const delPersonOf = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}`)
    if (confirmDelete) {
      personService
        .remove(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id))
          })
          .catch(error => {
            console.log('delete person failed:', error)
          })
    }
  }

  const handleNameChange = (event) => (setNewName(event.target.value))
  const handleNumberChange = (event) => (setNewNumber(event.target.value))
  const handlePersonFilter = (event) => (setPersonFilter(event.target.value))
  
  const personsToShow = personFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))

  const rows = personsToShow.map(person => 
    <Person 
      key={person.id}
      name={person.name}
      number={person.number}
      delPerson={() => delPersonOf(person.id, person.name)}
    />
  )

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
      {rows}
    </div>
  )
}

export default App