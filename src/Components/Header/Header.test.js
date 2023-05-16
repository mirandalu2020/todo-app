import {render, screen} from '@testing-library/react'
import Header from './Header'

describe('Unit test for Header component', ()=>{

  
  it('Should be visible', ()=>{
    render(
      <Header />
    )
    let header = screen.getByTestId('todo-header');
    expect(header).toBeVisible();
  })
})