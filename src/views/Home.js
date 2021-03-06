import React, {useState, useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchFilter from '../components/SearchFilter/SearchFilter'
import ContactGrid from '../components/ContactGrid/ContactGrid'
import './HomeContainer.scss'
import { fetchContacts } from '../services/contact'

const contactsPerPage = 50

const Home = () => {
  const dispatch = useDispatch()

  /**
   * @constant page
   * @type {Number}
   * @description Page number to request contacts
   */
  const [page, setPage] = useState(1)
  /**
   * @constant verticalScrollPos
   * @type {Number}
   * @description Vertical position scroll
   */
  const [verticalScrollPos, setVerticalScrollPos] = useState(0)
  /**
   * @constant containerSize
   * @type {Number}
   * @description Contact container size
   */
  const [containerSize, setContainerSize] = useState()
  /**
   * @constant searchString
   * @type {String}
   * @description Search string
   */
  const [searchString, setSearchString] = useState('')
  /**
   * @constant isLoading
   * @type {Boolean}
   * @description If contacts are loading
   */
  const [isLoading, setIsLoading] = useState(false)
  /**
   * @constant filteredContacts
   * @type {Array}
   * @description Lists of contacts to show in the view (Not the total from the store)
   */
  const [filteredContacts, setFilteredContacts] = useState([])

  /** @typedef {Array} Nationalities - Load nationalities from the Store */ 
  const nationalities = useCallback(useSelector(state => state.nationality), [])
  
  const getContacts = async(type, page, nationality) => {
    setIsLoading(true)
    // Service call
    const response = await fetchContacts(page, nationality)
    dispatch({ type, contacts: response.data.results })
    setIsLoading(false)
  }

  /** @typedef {Array} Contacts - Load contacts from the Store - Total */
  const contacts = useCallback(useSelector(state => state.contacts), [getContacts])
  /** @typedef {Array} LocalContacts - Load contacts from the Store filtering them that we show only */
  const localContacts = useCallback(useSelector(state => state.contacts).slice(0, page*contactsPerPage), [getContacts])

  /**
   * First Contact fetch
   * @event useEffect
   * @type {function}
   */
  useEffect(() => {
    getContacts('SET_CONTACTS', page, nationalities.selected.code)
  }, [])


  /**
   * Everytime [page] change, if there are less than 1000 contacts in the store and the search is empty, we download the next page
   * @event useEffect
   * @type {function}
   */
  useEffect(() => {
    if(contacts.length < 1000 && searchString === '') {
      getContacts('ADD_CONTACTS', page + 1, nationalities.selected.code)
    }
  }, [page])

  /**
   * @event scrollContent
   * @type {function}
   * Everytime user scroll, set scroll position and container height
   */
  const scrollContent = (e) => {
    const {target} = e
    setVerticalScrollPos((target.scrollHeight - target.scrollTop))
    setContainerSize(target.clientHeight)
  }

  /**
   * Everytime [verticalScrollPos] and [containerSize] change and scroll reaches the bottom of the page, we increment the number of page
   * @event useEffect
   * @type {function}
   */
  useEffect(() => {
    if(verticalScrollPos === containerSize) {
      setPage(page + 1)
    }
  }, [verticalScrollPos, containerSize])

  /**
   * Everytime user type in in pur search set that value in searchString
   * @event onTypeSearch
   * @type {function}
   */
  const onTypeSearch = (e) => {
    setSearchString(e.target.value)
  }

  /**
   * Everytime [contacts] and [searchString] change the filtered contact list is updated
   * @event useEffect
   * @type {function}
   */
  useEffect(() => {
    if(searchString.length > 1) {
      const filtered = localContacts.filter(elem => {
        return (elem.name.first.includes(searchString) || elem.name.last.includes(searchString))
      })
      setFilteredContacts(filtered)
    } else {
      setFilteredContacts(localContacts)
    }
  }, [contacts, searchString])

  return (
    <>
    <div className="home-container position-relative h-100"> 
      <div className="main-container pt-2">
        <SearchFilter onType={onTypeSearch}/>
      </div>
      <div className="home-container__in" onScroll={(e) => scrollContent(e)}>
        <div className="main-container">
          {(filteredContacts.length > 0) && <ContactGrid contacts={filteredContacts}/>}
          {(filteredContacts.length === 0 && searchString.length > 2) && <p className="p-2">There is no results</p>}
        </div>
      </div>
      <div className="fixed-bottom">
        <div className="main-container text-center">
          {(isLoading) && (<p className="mb-1"><strong>Loading...</strong></p>)}
          {(verticalScrollPos === containerSize) && (localContacts.length >= 1000) && (<p className="mb-1">End of contact catalogs</p>)}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
