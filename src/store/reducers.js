import { combineReducers } from 'redux'
import contacts from './contacts/reducers'
import nationality from './nationality/reducers'

export default combineReducers({
  contacts,
  nationality
})