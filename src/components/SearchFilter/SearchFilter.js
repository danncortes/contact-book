import React from 'react'
import { Form } from 'react-bootstrap';

const SearchFilter = ({onType}) => {
  return (
    <Form.Control
      type="search"
      onChange={onType}
      placeholder="Search by Name or Last Name"
    />
  )
}

export default SearchFilter