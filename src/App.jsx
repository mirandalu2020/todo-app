import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './Components/Nav/nav'
import Todo from './Components/Todo';
import SettingsForm from './Components/SettingsForm';
import SettingProvider from './Context/Settings';
import LoginProvider from  './Context/context';
import Login from './Components/auth/Login';

function App () {


    return (
      <>
      <Nav />
      <BrowserRouter>
      <LoginProvider> 
        <Login />
          <SettingProvider>
            <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<SettingsForm />} />
            </Routes>
          </SettingProvider>
        </LoginProvider>
      </BrowserRouter>
      </>
    );
  }

export default App;
