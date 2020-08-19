import React, {Component} from 'react';
import './css/TopBar.css';

class TopBar extends Component {
   
    render() {
        return(
          <>
            <div className='navbar'>
              
            </div>
            <div className='control-bar'>

              <span id="logo">
                <img id="logo-img" height="40" src='/logo192.png' alt="node"/>
                <span id="logo-title">Online Editor</span>
              </span>

              <span id="btn-wrapper">
                <button className="button"><i className="material-icons">save</i></button>
                <button className="button"><i className="material-icons">delete</i></button>
              </span>
              
            </div>
            <div className='breadcrumb'>
            </div>
          </>
        )
    }
}

export default TopBar;