import axios from "axios"

const getAll = baseUrl => {
    return (
        axios.get(baseUrl)
    )
}

export default {getAll}