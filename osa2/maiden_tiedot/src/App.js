import { useState, useEffect } from "react"
import noteService from "./services/notes"

const Country = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  )
}

const ShowCountry = country => {
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

const Results = ({ countriesToShow }) => {
  const length = countriesToShow.length
  const country = countriesToShow[0]
  //console.log("pituus", length)

  if (length === 1) {
    return (
      ShowCountry(country)
    )
  } else if (length < 10) {
    return (
      <div>
        {countriesToShow.map(country =>
          <Country
            key={country.name.common}
            name={country.name.common}
          />
        )}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  //console.log(countries)
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  //console.log(countriesToShow)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    //console.log(event.target.value)
  }

  return (
    <div>
      <div>
        <form>
          find countries 
          <input value={filter} onChange={handleFilterChange} />
        </form>
      </div>
      <Results countriesToShow={countriesToShow} />
    </div>
  )
}

export default App