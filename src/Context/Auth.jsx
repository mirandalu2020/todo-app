import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

const testUsers = {
  Admininistrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

export const LoginContext = React.createContext();

const initialState = {
  loggedIn: false,
  user: { capabilities: []},
  token: '',
  error: null
}

function loginReducer(state, action){
  switch(action.type) {

    case 'LOG_IN':
      let login = {
        loggedIn: true, 
        user: action.payload
      }
      console.log(login)
        return login;

    case 'LOG_IN_FAILED':
      initialState.error = action.payload
      console.log(initialState.error)
     return {...state, initialState}; 

    case 'LOG_OUT':
      return initialState

    default: return state;
  }
}

function LoginProvider({ children }) {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);

  const can = (capability) => {
    return state.user.capability.includes(capability)
  }

  const login = async (username, password) => {
    // let { loggedIn, token, user } = this.state;
    let auth = testUsers[username];
    console.log(username, testUsers[username])
    if (auth && (auth.password === password)) {
      try {
        console.log(auth.token)
        validateToken(auth.token);
        setLoginState(auth.token)
      } catch (e) {
        dispatch({
          type: 'LOG_IN_FAILED',
          payload: e
        })
        console.error(e);
      }
    }
    else {
      dispatch({
        type: 'LOG_IN_FAILED',
        payload: 'LOG_IN_FAILED'
      })
      return initialState.error = {message: 'Log in error'}
    }
  }

  const logout = () => {
    dispatch({
      type: 'LOG_OUT'
    })
    console.log('logging out')
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      console.log('VALID USER, ', validUser)
      dispatch({
        type: 'LOG_IN', 
        payload: validUser
      })
      // setLoginState(token, true,validUser);
    }
    catch (e) {
      setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }
  };

  const setLoginState = (token, loggedIn, user, error) => {
    cookie.save('auth', token);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

    return (
      <LoginContext.Provider value={{state, can, login, logout}}>
        {children}
      </LoginContext.Provider>
    );
  

}

export default LoginProvider;