import React, { useContext } from 'react';
import {When} from 'react-if';

import { LoginContext } from '../../Context/context';

function Login(){

  const {credential, can, login, logout} = useContext(LoginContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = (e) =>{
    // console.log(e.target)
    if (e.target.name === 'username'){
      setUsername(e.target.value )
    }
    else if (e.target.name === 'password'){
      setPassword(e.target.value )
    }
    console.log(username, password)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

    return (
      <>
        <When condition={credential.loggedIn}>
          <button onClick={logout}>Log Out</button>
        </When>

        <When condition={!credential.loggedIn}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button>Login</button>
          </form>
        </When>
      </>
    );
  }

export default Login;