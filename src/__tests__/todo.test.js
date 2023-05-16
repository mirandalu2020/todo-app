import { render, screen, fireEvent} from '@testing-library/react';
import App from './../App';

xdescribe('Integration test for the app', ()=>{

  render(
    <App />
  )

  it('Header should correclty display the count of incomplet tests', ()=>{
  })
})