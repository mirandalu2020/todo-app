import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './Components/Nav/nav'
import Todo from './Components/Todo';
import SettingsForm from './Components/SettingsForm';
import SettingProvider from './Context/Settings';

export default class App extends React.Component {

  render() {
    return (
      <>
      <Nav />
      <BrowserRouter>
        <SettingProvider>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </SettingProvider>
      </BrowserRouter>
      </>
    );
  }
}
