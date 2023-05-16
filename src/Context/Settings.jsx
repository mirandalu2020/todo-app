/* eslint-disable no-unused-vars */
import React from 'react';

export const Settingscontext = React.createContext();

function SettingProvider ({ children }){

  const [hideCompleted, setHideCompleted] = React.useState(true);

  // eslint-disable-next-line
  const [itemsShown, setItemsShown] = React.useState(3);

  const toggleHideCompleted = () => {
    setHideCompleted(current => !current);
    console.log(hideCompleted);
  }

  return(
    <Settingscontext.Provider 
    value={{toggleHideCompleted, itemsShown}}>
      {/* <button onClick={toggleHideCompleted} >Show Completed </button> */}
      {children}
    </Settingscontext.Provider>
  )

}

export default SettingProvider;

