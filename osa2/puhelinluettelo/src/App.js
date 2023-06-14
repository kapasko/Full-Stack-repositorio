import { useState, useEffect } from 'react'
import noteService from "./services/notes"

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

const Header = ({ text }) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
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

const Person = ({ name, number, handleDeletion}) => {
  return (
    <div>
      {name} {number}
      <button onClick={handleDeletion}>delete</button>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

//const Persons = ({ personsToShow, handleDeletion }) => {
  //return (
    //<div>
      //{personsToShow.map(person => 
      //<Person key={person.id} name={person.name} number={person.number} />
      //)}
    //</div>
  //)
//}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const filter = newFilter.toLowerCase()

  const hook = () => {
    noteService
      .getAll()
      .then(response => {
        //console.log("data", response.data)
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  //console.log("render", persons.length, "persons")

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
    }

    //console.log("current person id", personObject.id)

    if (nameArray.includes(newName)) {
      const person = persons.find(person => person.name === newName)
      const id = person.id
      //console.log(person)
      const decision = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if (decision) {
        noteService
          .update(id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            setNewName("")
            setNewNumber("")
            setMessage(`Updated ${newName}`)
          })
      }
    } else {
      noteService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
          setMessage(`Added ${newName}`)
        })
    }
    setTimeout(() => {
      setMessage(null)
    }, 3000)
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

  const handleDeletionOf = id => {
    const person = persons.find(person => person.id === id)
    const name = person.name
    const decision = window.confirm(`Delete ${name}?`)
    //console.log(decision)

    if (decision) {
      noteService
        .deletePerson(id)
        .catch(error => {
          setMessage(null)
          setErrorMessage(`Information of ${name} has already been removed from server`)
        })

      setPersons(persons.filter(person => person.id !== id))
      setMessage(`Deleted ${name}`)

    }
    setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={message} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Header text="add a new" />
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <Header text="Numbers" />
      <div>
        {personsToShow.map(person => 
          <Person key={person.id} name={person.name} number={person.number} handleDeletion={() => handleDeletionOf(person.id)} />
        )}
    </div>
    </div>
  )
}

export default App