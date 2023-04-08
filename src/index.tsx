import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Category from './shop/Category';
import Admin from './shop/Admin';
import Shop from './shop/Shop';
import Intro from './simple/Intro';
import Contact from './simple/contact';

import {
  BrowserRouter,
  Routes,
  Route, Link
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<App />}>

          <Route index element={<Intro />} />
          
          <Route path="/shop" element={<Shop />}>
            <Route index element={<div style={{textAlign: 'center'}} className='code'><br/>Please choose category</div>} />
            <Route path="/shop/dairy" element={<Category CategoryName='dairy'/>} />
            <Route path="/shop/snacks" element={<Category CategoryName='snacks'/>} />
            <Route path="/shop/meats" element={<Category CategoryName='meats'/>} />
          </Route>


          <Route path="/contact-us" element={<Contact />}/>
          <Route path="/admin" element={<Admin />}/>
          

        </Route>

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);


