import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = object => {
    return (
        axios.post(baseUrl, object)
    )
}

const getAll = () => {
    return (
        axios.get(baseUrl)
    )
}

const deletePerson = id => {
    //console.log(`painoit nappia: ${baseUrl}/${id}`)

    return (
        axios.delete(`${baseUrl}/${id}`)
        //axios.delete("http://localhost:3001/persons/1")
    )
}

const update = (id, object) => {
    return (
        axios.put(`${baseUrl}/${id}`, object)
    )
}

export default { create, getAll, deletePerson, update }