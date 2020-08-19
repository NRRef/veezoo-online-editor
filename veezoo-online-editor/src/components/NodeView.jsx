import React, { Component } from "react";
//import NodeItem from "./NodeItem";
import "./css/NodeView.css";
import * as axios from 'axios';
class NodeView extends Component {
  state = {
    fileTree: [],
    openedFiles: []
  };
  componentDidMount = async () => {
    let self = this;
     axios
      .get("https://my-json-server.typicode.com/open-veezoo/editor/filetree")
      .then(function (response) {
        const jsonTree = response.data;
        self.treeMount(jsonTree)
        self.setState({ fileTree: jsonTree });
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  closeTab = (t) => {
    var id = t.path[1].getAttribute('data-id')
    this.deleteCode(id)
    t.path[3].remove()
    var opened = this.state.openedFiles;
    if(opened.length>0){
      this.selectCode(opened[0].id.toString());
      this.highlightSelectedTab(opened[0].id);
      this.highlightSelectedById(opened[0].id);
    }else{
      var editor = document.querySelector('.CodeMirror').CodeMirror;
      editor.setValue('')
    }
    
  }
  clickTab = (t) => {
    var id = t.path[0].getAttribute('data-id')
    this.highlightSelectedTab(id);
    this.highlightSelectedById(id)
    this.selectCode(id);
    
  }
  appendTab = (id) => {
    var elem = this.getCode(id);
    var tabWrpr = document.getElementById('tab-wrapper');
    var tab = document.createElement('span');
    var tabTitle = document.createElement('span');
    var tabClose = document.createElement('span');
    var aClose = document.createElement('a');
    var iClose = document.createElement('i');
    aClose.onclick = this.closeTab;
    aClose.setAttribute('data-id', elem.id);
    iClose.classList.add('material-icons');
    iClose.innerText = 'close'; 
    aClose.appendChild(iClose);
    tabClose.appendChild(aClose)
    tab.classList.add('tab');
    tab.setAttribute('data-id', elem.id);
    tabTitle.classList.add('tab-title');
    tabTitle.innerText = elem.name;  
    tabClose.classList.add('tab-close');
    tab.onclick = this.clickTab;
    tab.appendChild(tabTitle);
    tab.appendChild(tabClose);
    tabWrpr.appendChild(tab);
    
    
  }
  collapseTree = (t) => {
    t.path[1].classList.toggle("close");
    t.path[1].classList.toggle("open");
    t.path[2].classList.toggle("collapse");
    
  }
  getCodeFromApi = async (id) => {
    let self = this;
    if(self.checkIfFileOpened(id)){
      self.selectCode(id)
      self.highlightSelectedTab(id) 
      return 0;
    }else{
    await axios
      .get("https://my-json-server.typicode.com/open-veezoo/editor/files/" + id)
      .then(function (response) {
        const resp = response.data
        var respMap = {id:resp.id,name:resp.name,content:resp.content};
          var arrayState = self.state.openedFiles;
          arrayState.push(respMap)
          self.setState({ openedFiles: arrayState });
          self.selectCode(resp.id)   
          self.appendTab(resp.id) 
          self.highlightSelectedTab(resp.id) 
        return 1;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  appendCode = async (t) => {
    var id = t.path[0].getAttribute('data-id');
    await this.getCodeFromApi(id);
    this.highlightSelected(t.path[1])
  }
  checkIfFileOpened = (id) => {
    var val = false;
    var opened = this.state.openedFiles;

    opened.forEach(element => {
      // eslint-disable-next-line
      if(element.id == id){
        val = true
      }
    });
    return val;

  }
  getCode = (id) => {
    var elem;
    var opened = this.state.openedFiles;

    opened.forEach(element => {
      // eslint-disable-next-line
      if(element.id == id){
        elem = element;
      }
    });
    if(elem != null){
      return elem;
    }else{
      return null;
    }
  }
  deleteCode = (id) => {
    var opened = this.state.openedFiles;
    for(var i = 0 ; i<opened.length; i++){
      if(opened[i].id == id){
        opened.splice(i,1)
      }
    }
  }
  selectCode = (id) => {
    var editor = document.querySelector('.CodeMirror').CodeMirror;
    var elem;
    var opened = this.state.openedFiles;

    opened.forEach(element => {
      // eslint-disable-next-line
      if(element.id == id){
        elem = element;
      }
    });
    if(elem != null){
      editor.setValue(elem.content);
    }
  }
  highlightSelected = (elem) => {
    var elemList = document.getElementsByClassName('file-active');
    for(var i = 0; i <  elemList.length; i++){
      elemList[i].classList.remove('file-active')
    }
    elem.classList.add('file-active')
  }
  highlightSelectedById = (id) => {
    var elemList = document.getElementsByClassName('file-active');
    var elem = document.getElementsByClassName('node');
    for(var i = 0; i <  elemList.length; i++){
      elemList[i].classList.remove('file-active')
    }
    for(i = 0; i < elem.length; i++){
      // eslint-disable-next-line
      if(elem[i].childNodes[1].getAttribute('data-id') == id){
        elem[i].classList.add('file-active')
      }
    }
  }
  highlightSelectedTab = (id) => {
    var elemList = document.getElementsByClassName('tab-active');
    var elem = document.getElementsByClassName('tab');

    for(var i = 0; i <  elemList.length; i++){
      elemList[i].classList.remove('tab-active')
    }
    for(i = 0; i < elem.length; i++){
      // eslint-disable-next-line      
      if(elem[i].getAttribute('data-id') == id){
        elem[i].classList.add('tab-active')
        return elem[i];
      }
    }
    
  }
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
          iconElement.classList.add('material-icons');
          iconElement.textContent = 'folder';

          collapseElement = document.createElement('i')
          collapseElement.classList.add('collapse');
          collapseElement.classList.add('material-icons');
          collapseElement.textContent = 'expand_more';
          
          var temp = document.createElement('a');
          temp.type='button';
          temp.onclick = this.collapseTree;
          temp.classList.add("button-collapse");
          temp.classList.add("open");
          temp.appendChild(collapseElement);
          
          collapseElement = temp

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
          childElement.classList.add('node');
          iconElement = document.createElement('i')
          iconElement.classList.add('material-icons');
          iconElement.textContent = 'article';
          textElement = document.createElement('a');
          textElement.classList.add('nodeLink');
          textElement.type = 'button'
          textElement.textContent = element.name;
          textElement.setAttribute('data-id', element.id);
          textElement.onclick = this.appendCode;
          

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
          <ul className="disable-select" id="fileTreeRootNode">

          </ul>
        </div>
      </>
    );
  }
}

export default NodeView;
