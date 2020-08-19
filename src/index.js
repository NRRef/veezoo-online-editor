import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/SideBar'
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import EditorField from './components/EditorField';


ReactDOM.render(
  <React.StrictMode>
    <TopBar />
    <SideBar />
    <EditorField />

  </React.StrictMode>,
  document.getElementById('root')
);
