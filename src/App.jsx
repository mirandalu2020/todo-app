import React from 'react';

import Todo from './Components/Todo';
import SettingsForm from './Components/SettingsForm';
import SettingProvider from './Context/Settings';

export default class App extends React.Component {

  render() {
    return (
      <SettingProvider>
        <Todo />
        <SettingsForm />
      </SettingProvider>
    );
  }
}
