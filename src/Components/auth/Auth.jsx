import { useContext } from 'react';

import { LoginContext } from '../../Context/Auth';

function Auth({capability, children}) {

  //  const context = LoginContext;
  const context = useContext(LoginContext)
  
    const isLoggedIn = context.state.loggedIn;
    const canDo = capability ? context.can(capability) : true;
    console.log(canDo, context);
    const okToRender = isLoggedIn && canDo;
  
    return (
      okToRender &&
        children 
    );
}

export default Auth;