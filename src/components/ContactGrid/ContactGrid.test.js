import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'
import ContactGrid from './ContactGrid'
import contactsMock from '../../mocks/contacts'

describe('ContactGrid Component', () => {
  
  let component;

  beforeEach(() => {
    component = render(<ContactGrid contacts={contactsMock}/>)
  })

  it('Should render the right number of items', () => {
    expect(document.querySelectorAll('.contact-item').length).toBe(contactsMock.length)
  })
  
  it('Should show Modal', () => {
    const [expectedContact] = contactsMock
    const {name: {first, last}, email, login: {username}} = expectedContact    
    expect(screen.getByText(first)).toBeInTheDocument()
    expect(screen.getByText(last)).toBeInTheDocument()
    expect(screen.getByText(email)).toBeInTheDocument()
    expect(screen.getByText(username)).toBeInTheDocument()
  })

  it('Should show Modal', () => {
    fireEvent.click(document.querySelector('.contact-item'))
    expect(document.querySelectorAll('.contact-modal').length).toEqual(1)
  })

  it('Should modal show required info', () => {
    fireEvent.click(document.querySelector('.contact-item'))
    const [expectedContact] = contactsMock
    const {location: {city, state, postcode}, phone, cell} = expectedContact    
    expect(screen.getByText(city)).toBeInTheDocument()
    expect(screen.getByText(state)).toBeInTheDocument()
    expect(screen.getByText(`${postcode}`)).toBeInTheDocument()
    expect(screen.getByText(phone)).toBeInTheDocument()
    expect(screen.getByText(cell)).toBeInTheDocument()
  })
})