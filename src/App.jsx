import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './Components/Nav/nav'
import Todo from './Components/Todo';
import SettingsForm from './Components/SettingsForm';
import SettingProvider from './Context/Settings';
import LoginProvider from  './Context/Auth';
import Auth from './Components/auth/Auth'

import './App.css';

function App () {

    return (
      <>
      <BrowserRouter>
      <LoginProvider>
        <div className='body-container'>
        <Nav />
        <Auth capability='read'>
          <SettingProvider>
            <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<SettingsForm />} />
            </Routes>
          </SettingProvider>
        </Auth>
          </div> 
        </LoginProvider>
      </BrowserRouter>
      </>
    );
  }

export default App;
