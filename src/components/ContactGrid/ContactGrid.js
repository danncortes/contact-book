import React, {useState} from 'react'
import ContactItem from '../ContactItem/ContactItem'
import ContactModal from '../ContactModal/ContactModal'
import PropTypes from 'prop-types';

const ContactGrid = ({ contacts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState({})
  
  const seeContactDetail = (contact) => {
    (!isModalOpen) && setIsModalOpen(true)
    setSelectedContact(contact)
  }
  
  return (
    <>
      {(Object.keys(selectedContact).length > 0)
        && (<ContactModal isOpen={isModalOpen} contact={selectedContact} onHide={() => setIsModalOpen(false)} />)}
        
      <div className="contacts-grid">
        {contacts.map((contact, index) => (
          <div key={index}  onClick={() => seeContactDetail(contact)}>
            <ContactItem  contact={contact}/>
          </div>
        ))}
      </div>
    </>
  )
}

ContactGrid.propTypes = {
  contacts: PropTypes.array
}

export default ContactGrid