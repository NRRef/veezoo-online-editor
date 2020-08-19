import React, {Component} from 'react';
import './css/SideBar.css';
import NodeView from './NodeView';



class SideBar extends Component {
    

    render() {
        return(
          <>
            <div className='side-bar'>
              <div id="files-title">EXPLORER:</div>
              <div id="files-body">
                  <NodeView/>
                </div>
            </div>
          </>
        )
    }
}

export default SideBar;