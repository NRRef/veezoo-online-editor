import React, {Component} from 'react';
import './css/TopBar.css';
import * as axios from 'axios';

class TopBar extends Component {
    saveOnApi = async () => {
      if(document.getElementsByClassName('file-active').length>0){
        let editor = document.querySelector('.CodeMirror').CodeMirror;
        editor = editor.getValue();
        var active = document.getElementsByClassName('file-active')[0]
        var id = active.getElementsByTagName('a')[0].getAttribute('data-id');
        await axios
        .put("https://my-json-server.typicode.com/open-veezoo/editor/files/" + id,
        {
          content: editor
        })
        .then(function (response) {
          
          return 1;
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }
    deleteOnApi = async () => {
      if(document.getElementsByClassName('file-active').length>0){
        
        var active = document.getElementsByClassName('file-active')[0]
        var id = active.getElementsByTagName('a')[0].getAttribute('data-id');
        await axios
        .delete("https://my-json-server.typicode.com/open-veezoo/editor/files/" + id)
        .then(function (response) {
          
          return 1;
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }
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
              <span id="tab-wrapper">
                
                
              </span>
              <span id="btn-wrapper">
                <button onClick={this.saveOnApi} className="button"><i className="material-icons">save</i></button>
                <button onClick={this.deleteOnApi} className="button"><i className="material-icons">delete</i></button>
              </span>
              
            </div>
            {/* <div className='breadcrumb'>
            </div> */}
          </>
        )
    }
}

export default TopBar;