import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const CustomSelect = ({nationalities, onChange}) => {
  return (
    <Form>
      <Form.Group controlId="custom-select" onChange={(e) => onChange(e.target.value)}>
        <Form.Control as="select" custom>
          {
            (nationalities.list.map(el => (
            <option
              key={el.code}
              label={el.label}
              selected={(el.code === nationalities.selected.code)}>
              {el.code}
            </option>
            )))
          }
        </Form.Control> 
      </Form.Group>
    </Form>
  );
}

CustomSelect.propTypes = {
  nationalities: PropTypes.object,
  onChange: PropTypes.func
};

export default CustomSelect;