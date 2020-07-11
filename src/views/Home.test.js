import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import contacts from '../store/contacts/reducers'
import nationality from '../store/nationality/reducers'
import configureMockStore from 'redux-mock-store'
import Home from './Home'
import contactsMock from '../mocks/contacts'

let component;

const mockStore = configureMockStore();

const store = mockStore({
  contacts: contactsMock,
  nationality: {
    selected: {label: 'Switzerland', code: 'CH'},
    list: [
      {label: 'Switzerland', code: 'CH'},
      {label: 'Spain', code: 'ES'},
      {label: 'France', code: 'FR'},
      {label: 'Great Britain', code: 'GB'}
    ]
  }
});

const reducer = combineReducers({
  contacts,
  nationality
})

beforeEach(() => {
  component = render(<Provider store={store}><Home /></Provider>)
})

it('Should render ContactGrid Component', () => {
  expect(document.querySelectorAll('.contacts-grid').length).toEqual(1)
})

it('Should render all the contacts', () => {
  expect(document.querySelectorAll('.contact-item').length).toEqual(2)
})

it('Should render Search Filter Component', () => {
  expect(document.querySelectorAll('.search-filter').length).toEqual(1)
})

it('Should filter contacts by the string in SearchFilter Component', () => {
  const searchFilter = screen.getByPlaceholderText('Search by Name or Last Name')
  fireEvent.change(searchFilter, { target: { value: 'Luisa' } })
  expect(document.querySelectorAll('.contact-item').length).toEqual(1)
  const [expectedContact] = contactsMock
  const {name: {first, last}, email, login: {username}} = expectedContact    
  expect(screen.getByText(first)).toBeInTheDocument()
  expect(screen.getByText(last)).toBeInTheDocument()
  expect(screen.getByText(email)).toBeInTheDocument()
  expect(screen.getByText(username)).toBeInTheDocument()
})

it('Should show `There is no results` message', () => {
  const searchFilter = screen.getByPlaceholderText('Search by Name or Last Name')
  fireEvent.change(searchFilter, { target: { value: 'xxx' } })
  expect(document.querySelectorAll('.contact-item').length).toEqual(0)
  expect(screen.getByText('There is no results')).toBeInTheDocument()
})