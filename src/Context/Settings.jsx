/* eslint-disable no-unused-vars */
import React from 'react';

export const SettingsContext = React.createContext();

function SettingProvider ({ children }){

  const [hideCompleted, setHideCompleted] = React.useState(true);
  const [itemsShown, setItemsShown] = React.useState(3);
  const [sortMethod, setSortMethod] = React.useState('difficulty_asc');

  const toggleHideCompleted = () => {
    setHideCompleted(current => !current);
    // console.log(hideCompleted);
  }

  const changeSortMethod = (method) => {
    setSortMethod(method)
  }

  return(
    <SettingsContext.Provider 
    value={{
        hideCompleted, toggleHideCompleted, 
        itemsShown, setItemsShown,
        sortMethod, changeSortMethod,
        }}>
      {/* <button onClick={toggleHideCompleted} >Show Completed </button> */}
      {children}
    </SettingsContext.Provider>
  )

}

export default SettingProvider;

