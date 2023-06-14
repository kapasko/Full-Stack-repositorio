import { useState, useEffect } from "react"
import noteService from "./services/notes"

const Country = ({ name, handleShow }) => {
  return (
    <div>
      {name} 
      <button onClick={handleShow}>show</button>
    </div>
  )
}

const ShowCountry = ({ country }) => {
  const languages = Object.values(country.languages)
  const image = country.flags.png
  //console.log(image)
  //console.log(languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital}
        <br />
        area {country.area}
      </div>
      <h3>languages:</h3>
      <ul>
        {languages.map(language =>
          <li key={language}>{language}</li>  
        )}
      </ul>
      <div>
        <img src={image} alt="Country's flag" />
      </div>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [finder, setFinder] = useState("")

  useEffect(() => {
    noteService
      .getAll("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  //console.log(countries)
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(finder.toLowerCase()))
  //console.log(countriesToShow)
  const length = countriesToShow.length
  const countryToShow = countriesToShow[0]
  //console.log("pituus", length)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFinder(event.target.value)
    //console.log(event.target.value)
  }

  const handleShow = country => {
    setFinder(country.name.common)
  }

  if (length === 1) {
    return (
      <div>
        <form>
          find countries 
          <input value={filter} onChange={handleFilterChange} />
        </form>
        <div>
          <ShowCountry country={countryToShow} />
        </div>
      </div>
    )
  } else if (length < 10) {
    return (
      <div>
        <div>
          <form>
            find countries 
            <input value={filter} onChange={handleFilterChange} />
          </form>
        </div>
        <div>
          {countriesToShow.map(country =>
            <Country
              key={country.name.common}
              name={country.name.common}
              handleShow={() => handleShow(country)}
            />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <form>
            find countries 
            <input value={filter} onChange={handleFilterChange} />
          </form>
        </div>
        <div>
          Too many matches, specify another filter
        </div>
      </div>
    )
  }
}

export default App