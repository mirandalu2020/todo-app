import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { SettingsContext } from './../../Context/Settings'
import SettingProvider from '../../Context/Settings';
import Todo from '.';

describe('ToDo Component Tests', ()  => {

  // const { toggleHideCompleted } = useContext(SettingsContext);
  render(
    <SettingProvider>
      <Todo />
    </SettingProvider>
  );
  let inputItem = screen.getByPlaceholderText('Item Details');
  let assignedTo = screen.getByPlaceholderText('Assignee Name');
  let addItemButton = screen.getByText('Add Item');
   fireEvent.change(inputItem, {target: {value: 'item1'}});
   fireEvent.change(assignedTo, {target: {value: 'assignee1'}});
   fireEvent.click(addItemButton);

  test('Can successfully add item to list', () => {

     let todoList = screen.getByTestId('todo-container');
     expect(todoList).toBeVisible();
     expect(todoList).toHaveTextContent(/item1/);
     expect(todoList).toHaveTextContent(/assignee1/);
     expect(todoList).toHaveTextContent(/Complete: false/);
  });
  
})
