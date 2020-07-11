import React from 'react';
import PropTypes from 'prop-types';
import './ContactItem.scss'

const ContactItem = ({ contact }) => {
  const { picture: { thumbnail }, name: { first, last }, login: {username}, email } = contact
  return (
    <div className="contact-item d-flex justify-content-start align-items-start p-2">
      <img className="mr-3" src={thumbnail} />
      <div> 
        <p><strong>First name:</strong> {first}</p>
        <p><strong>Last name:</strong> {last}</p>
        <p><strong>Username:</strong> {username}</p>
        <p className="mb-0"><strong>Email:</strong> {email}</p>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object
}

export default ContactItem