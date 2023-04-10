import React from 'react';
import './App.css';
import MyNavBar from './MyNavBar';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom"

function App() {
  return (
    <div>

      <MyNavBar />

      <div>
      <Outlet />
      </div>
      
      
    </div>
  );
}

export default App;
