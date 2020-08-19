import React, {Component} from 'react';
import './css/EditorField.css';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike';





class EditorField extends Component {

    render() {
        return(
          <>
            <div id='editor-area'>
              <CodeMirror
                  options={{
                      theme: 'material',
                      keyMap: 'sublime',
                      mode: 'text/x-java',
                  }}
                  />        
            </div>
          </>
        )
    }
}

export default EditorField;