import React, { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth';

function Login(){

  const {state, login, logout, signup} = useContext(LoginContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('user');

  const handleChange = (e) =>{
    // console.log(e.target)
    if (e.target.name === 'username'){
      setUsername(e.target.value )
    }
    else if (e.target.name === 'password'){
      setPassword(e.target.value)
    }
    else if (e.target.name === 'role'){
      setRole(e.target.value)
    }
    // console.log(username, password)
  }

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    callback(username, password, role);
  };

    return (
      <>
        <When condition={state.loggedIn}>
          <button onClick={logout}>Log Out</button>
        </When>

        <When condition={!state.loggedIn}>
          <form onSubmit={(e)=>handleSubmit(e, login)}>
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

          <form onSubmit={(e)=>handleSubmit(e, signup)}>
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
            <select
              placeholder="role"
              name="role"
              onChange={handleChange}
            >
              <option name = "user" value="user">user</option>
              <option name="editor" value="editor">editor</option>
              <option name="writer" value="writer">writer</option>
              <option name="admin" value="admin">admin</option>
            </select>
            <button>Sign Up</button>
          </form>
        </When>
      </>
    );
  }

export default Login;