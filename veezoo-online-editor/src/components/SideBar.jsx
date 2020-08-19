import React, {Component} from 'react';
import './css/SideBar.css';
import NodeView from './NodeView';

import * as axios from 'axios';

class SideBar extends Component {
  
  componentDidMount = async () => {
    let jsonResponse;
    await axios.get('https://my-json-server.typicode.com/open-veezoo/editor/filetree')
    .then(function (response) {
      jsonResponse = response.data;
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.fileTreeLoader(jsonResponse);
  }

  fileTreeLoader = (jsonObject) => {
    console.log(jsonObject);
    console.log('s');
    
  }
    render() {
        return(
          <>
            <div className='side-bar'>
              <div id="files-title">Files:</div>
              <div id="files-body"><NodeView/></div>
            </div>
          </>
        )
    }
}

export default SideBar;