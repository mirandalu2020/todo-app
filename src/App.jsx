import React from 'react';

import Todo from './Components/Todo';
import SettingProvider from './Context/Settings';

export default class App extends React.Component {

  render() {
    return (
      <SettingProvider>
        <Todo />
      </SettingProvider>
    );
  }
}
