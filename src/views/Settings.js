import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import CustomSelect from '../components/CustomSelect/CustomSelect'

function Settings() {

  const dispatch = useDispatch()
  const nationalities = useCallback(useSelector(state => state.nationality), [])
  
  const changeNationality = (selected) => {
    dispatch({type: 'SET_NATIONALITY', selected})
    dispatch({type: 'SET_CONTACTS', contacts: []})
  }
  
  return (
    <div className="settings-view">
      <div className="main-container mt-3">
        <h5>Change Nationality</h5>
        <CustomSelect nationalities={nationalities} onChange={changeNationality}/>
      </div>
    </div>
  );
}

export default Settings;