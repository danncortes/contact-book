const nationality = (state = {
  selected: {label: 'Switzerland', code: 'CH'},
  list: [
    {label: 'Switzerland', code: 'CH'},
    {label: 'Spain', code: 'ES'},
    {label: 'France', code: 'FR'},
    {label: 'Great Britain', code: 'GB'}
  ]
}, action) => {
  switch (action.type) {
    case 'SET_NATIONALITY':
      return {
        ...state,
        selected: state.list.find(el => el.code === action.selected)
      }
    default:
      return state
  }
}

export default nationality