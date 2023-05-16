import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { SettingsContext } from '../../Context/Settings'
import { v4 as uuid } from 'uuid';
import List from './../List/List';
import Header from './../Header/Header';
import { Input } from '@mantine/core';

const Todo = () => {

  const [list, setList] = useState([]);
  const [renderedList, setRenderedList] = useState([]);
  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  const { toggleHideCompleted, hideCompleted, sortMethod, changeSortMethod } = useContext(SettingsContext);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  // eslint-disable-next-line
  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });
    setList(items);
  }

  function sortItem(){
    console.log('SORTING METHOD', sortMethod)
    // console.log('LIST, ', list)
    if (sortMethod === 'difficulty_asc'){
      let sortedList = list.sort((firstItem, secondItem) => firstItem.difficulty - secondItem.difficulty);
      return sortedList
    }
    if (sortMethod === 'difficulty_dsc'){
      let sortedList = list.sort((firstItem, secondItem) => secondItem.difficulty - firstItem.difficulty);
      console.log('SORTED', sortedList)
      return sortedList
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;

    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  

  useEffect(()=>{
    let result = sortItem();
    console.log('RESULT, ', result);
    // setList(result)
    if (hideCompleted === true){
      let display = result.filter(item=> !item.complete);
      setRenderedList(display);
    }
    else if (hideCompleted === false){
      setRenderedList(result);
    }
    // eslint-disable-next-line
  },[list, hideCompleted, sortMethod])


  return (
    <>
      <Header incomplete={incomplete}/>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>
        <label>
          <span>To Do Item</span>
          <input 
          onChange={handleChange} 
          name="text" type="text" 
          placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

        <button onClick={ ()=> toggleHideCompleted() }>Show Completed</button>

        Sort Method
        <Input component="select" 
        onChange={(e) => changeSortMethod(e.target.value)}> 
        <option value="difficulty_asc">Difficulty Ascending</option>
        <option value="difficulty_dsc">Difficulty Descending</option>
      </Input>
        <List list={renderedList} toggleComplete={toggleComplete}/>
    </>
  );
};

export default Todo;
