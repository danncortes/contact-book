import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ContactModal = ({ isOpen, contact, onHide}) => {
  const {name: {first, last}, location: {city, street, state, postcode}, phone, cell} = contact

  return (
    <Modal className="contact-modal" show={isOpen} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{first} {last}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Street: </strong>{street.name} {street.number}</p>
        <p><strong>City: </strong>{city}</p>
        <p><strong>State: </strong>{state}</p>
        <p><strong>Postcode: </strong>{postcode}</p>
        <p><strong>Phone: </strong>{phone}</p>
        <p><strong>Cell: </strong>{cell}</p>
      </Modal.Body>
    </Modal>
  );
}

ContactModal.propTypes = {
  isOpen: PropTypes.bool,
  contact: PropTypes.object,
  onHide: PropTypes.func,
};

export default ContactModal;