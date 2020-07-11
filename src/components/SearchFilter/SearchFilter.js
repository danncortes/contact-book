import React from 'react'
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchFilter = ({onType}) => {
  return (
    <Form.Control
      type="search"
      onChange={onType}
      placeholder="Search by Name or Last Name"
    />
  )
}

SearchFilter.propTypes = {
  onType: PropTypes.func,
};

export default SearchFilter