import axios from 'axios'

const baseURL = 'http://localhost:9090'

const fetchApi = axios.create({
  baseURL,
})

export { fetchApi }
