import LoginProvider, { LoginContext } from './Auth';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Testing the Auth Context Provider', ()=>{

  render(
    <LoginProvider>
      <LoginContext.Consumer>
        {auth => {
          console.log(auth.state)
          return (
            <>
              <p> Log in status: {`${auth.state.loggedIn}`} </p>
            </>
          )
        }}
      </LoginContext.Consumer>
    </LoginProvider>
  )
  test('Should display loggedIn status', ()=>{
    expect(screen.getByText(/Log in status: false/)).toBeVisible();
  });

  test('Should get logged in status when logged in', ()=>{
    expect(true).toBe(false);
  })
})
