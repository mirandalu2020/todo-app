import React from 'react';
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
  user: {},
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
     return initialState; 

    case 'LOG_OUT':
      return initialState

    default: return state;
  }
}

function LoginProvider({ children }) {
  const [credential, dispatch] = React.useReducer(loginReducer, initialState);

  const can = (capability) => {
    return credential.user.capability
  }

  const login = async (username, password) => {
    // let { loggedIn, token, user } = this.state;
    let auth = testUsers[username];
    console.log(testUsers[username])
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
      dispatch({
        type: 'LOG_IN', 
        payload: validUser
      })
      // this.setLoginState(true, token, validUser);
    }
    catch (e) {
      this.setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }

  };

  const setLoginState = (token, loggedIn, user, error) => {
    cookie.save('auth', token);
    // this.setState({ token, loggedIn, user, error: error || null });
  };

  /*
  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(token);
  }
  */

    return (
      <LoginContext.Provider value={{credential, can, login, logout}}>
        {children}
      </LoginContext.Provider>
    );
  

}

// class LoginProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedIn: false,
//       can: this.can,
//       login: this.login,
//       logout: this.logout,
//       user: { capabilities: [] },
//       error: null,
//     };
//   }
// }

export default LoginProvider;