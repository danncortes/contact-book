import axios from 'axios'
const {REACT_APP_BASE_URL_API} = process.env

const fetchContacts = async (page, nationality, contactsPerPage = 50) => {
  return await axios.get(`${REACT_APP_BASE_URL_API}/?page=${page}&results=${contactsPerPage}&seed=abc&nat=${nationality}`)
}

export {
  fetchContacts
}