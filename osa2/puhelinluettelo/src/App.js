import { useState } from 'react'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <form>
      <div>
        filter shown with
        <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>
    </form>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: 
        <input value={newNumber} 
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ name, number}) => {
  return (
    <div>
      {name} {number}
    </div>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => 
      <Person key={person.id} name={person.name} number={person.number} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: "", 
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [filterOn, newFilterOn] = useState(true)
  const filter = newFilter.toLowerCase()

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  //console.log(personsToShow)
  //console.log(filter, persons)

  const addPerson = (event) => {
    event.preventDefault()
    const nameArray = persons.map(person => person.name) 
    //console.log("nimi lisätty")
    //console.log(nameArray)

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    //console.log("current person id", personObject.id)

    if (nameArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log("target value", event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }      

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App