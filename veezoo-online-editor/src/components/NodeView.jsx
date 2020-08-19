import React, { Component } from "react";
//import NodeItem from "./NodeItem";
import "./css/NodeView.css";
import * as axios from 'axios';
class NodeView extends Component {
  state = {
    fileTree: [],
  };
  componentDidMount = async () => {
    let self = this;
    await axios
      .get("https://my-json-server.typicode.com/open-veezoo/editor/filetree")
      .then(function (response) {
        //jsonObj = response.data;
        const jsonTree = response.data;
        self.treeMount(jsonTree)
        self.setState({ fileTree: jsonTree });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  treeMount = (arr, elem = null) => {
    if(elem == null){
      elem = document.getElementById('fileTreeRootNode');
    }
    arr.forEach(element => {
      var childElement;
      var collapseElement;
      var iconElement;
      var textElement;
        if(element.isDirectory){
          childElement = document.createElement('ul');
          iconElement = document.createElement('i')
          collapseElement = document.createElement('i')
          iconElement.classList.add('material-icons');
          collapseElement.classList.add('collapse');
          collapseElement.classList.add('material-icons');
          iconElement.textContent = 'folder';
          collapseElement.textContent = 'chevron_right';
          
          textElement = document.createElement('span');
          textElement.textContent = element.name;
          childElement.appendChild(collapseElement)
          childElement.appendChild(iconElement)
          childElement.appendChild(textElement)
          
          //childElement.textContent = element.name;
          elem.appendChild(childElement);
          this.treeMount(element.children,childElement)
          
        }else{
          
          childElement = document.createElement('li');
          iconElement = document.createElement('i')
          iconElement.classList.add('material-icons');
          iconElement.textContent = 'article';
          textElement = document.createElement('a');
          textElement.classList.add('nodeLink');
          
          textElement.textContent = element.name;
          childElement.appendChild(iconElement)
          childElement.appendChild(textElement)
          elem.appendChild(childElement);
        }
    });
  }

  render() {
    return (
      <>
        <div>
          <ul id="fileTreeRootNode">

          </ul>
        </div>
      </>
    );
  }
}

export default NodeView;
