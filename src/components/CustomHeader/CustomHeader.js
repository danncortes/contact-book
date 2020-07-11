import React from 'react';
import './CustomHeader.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

const CustomHeader = () => {
  return (
    <>
      <header className="custom-header">
        <div className="main-container d-flex justify-content-between align-items-center">
          <h3 className="m-0">Address Book</h3>
          <nav>
            <ul className="p-0 m-0 d-flex justify-content-between list-unstyled">
              <li  className="mr-3">
                <Link to="/">Contacts</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default CustomHeader