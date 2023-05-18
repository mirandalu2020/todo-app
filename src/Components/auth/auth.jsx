import React, { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from './../../Context/context';

function Login({capability, children}) {

  //  const context = LoginContext;
  const context = useContext(LoginContext)
  
  
    const isLoggedIn = context.loggedIn;
    const canDo = capability ? context.can(capability) : true;
    const okToRender = isLoggedIn && canDo;
  
    return (
      okToRender &&
        children 
    );
  

}


export default Login;