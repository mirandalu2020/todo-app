import React, { useEffect, useState, useContext } from 'react';
import useCustomForm from '../../hooks/form';
import { Button, Group, Box, TextInput, Slider, RangeSlider } from '@mantine/core';
import { useForm } from '@mantine/form';

import { SettingsContext } from '../../Context/Settings'
import { v4 as uuid } from 'uuid';
import List from './../List/List';
import Header from './../Header/Header';

const Todo = () => {

  const [list, setList] = useState([]);
  const [renderedList, setRenderedList] = useState([]);
  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useCustomForm(addItem, defaultValues);
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
  },[list, hideCompleted, sortMethod]);

  const form = useForm({
    initialValues: {
      list: list,
    },
  });

  const MARKS = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];


  return (
    <>
      <Header incomplete={incomplete}/>

      <Box maw={300} mx="auto">
      <form onSubmit= {handleSubmit}>
        <TextInput
          onChange={handleChange}
          name="text" 
          label="To Do Item"
          placeholder="Item Details"
        />

      <TextInput
          onChange={handleChange}
          name="assignee" 
          label="Assignee Name"
          placeholder="Assignee Name"
        />

    <Slider
      onChange={handleChange}
      marks={MARKS}
      defaultValue={defaultValues.difficulty}
      step={1}  min={1} max={5}
      styles={{ markLabel: { display: 'none' } }}
      />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>

      {/* <form onSubmit={handleSubmit}>
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
      </form> */}

        {/* <button onClick={ ()=> toggleHideCompleted() }>Show Completed</button>

        Sort Method
        <Input component="select" 
        onChange={(e) => changeSortMethod(e.target.value)}> 
        <option value="difficulty_asc">Difficulty Ascending</option>
        <option value="difficulty_dsc">Difficulty Descending</option>
      </Input> */}
        <List list={renderedList} toggleComplete={toggleComplete}/>
    </>
  );
};

export default Todo;
