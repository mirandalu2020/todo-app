import React, { useEffect, useState, useContext } from 'react';
import useCustomForm from '../../hooks/form';
import { Button, Group, Box, TextInput, Slider } from '@mantine/core';
import {get, post, updateAndDelete} from './../CRUD/crud'

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
  const { toggleHideCompleted, hideCompleted, sortMethod, changeSortMethod, fetchSettings } = useContext(SettingsContext);

  async function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log('ITEM ADDED: ', item);
    const data =  {
      complete: false,
      difficulty: item.difficulty,
      text: item.text,
      assignee: item.assignee
    }
    // https://api-js401.herokuapp.com/api/v1/todo
    let postedTask = await post('/api/v1', 'https://api-js401.herokuapp.com', data, '/todo');
    console.log('POSTED: ', postedTask);
    item.id = postedTask._id;

    setList([...list, item]);
    console.log('LIST', list)
  }

  async function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
    await updateAndDelete('delete', '/api/v1', 'https://api-js401.herokuapp.com', '/todo', `/${id}`)
  }

  async function toggleComplete(id) {
    let data = {}
    const items = list.map((item) => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
        data = {"complete": item.complete }
      }
      return item;
    });
    console.log(data)
    updateAndDelete('put', '/api/v1', 'https://api-js401.herokuapp.com', '/todo', `/${id}`, data)
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

  useEffect(()=>{
    let savedSettings = localStorage.getItem('userSettings');
    if (savedSettings){
      let result = fetchSettings();
      console.log('fetch settings', result)
    }
    // eslint-disable-next-line
  },[list])

  useEffect(() => {
    //https://api-js401.herokuapp.com/api/v1/todo
    async function getData() {
      let result = await get('/api/v1', 'https://api-js401.herokuapp.com', '/todo')
      // console.log('LIST ON RENDER', result.results);
      let listOnRender = result.results.map(item => 
        item.id = item._id
      )
      console.log('LIST ON RENDER', result.results)
      setList(result.results);
    }
    getData();
  }, [])

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
        <List list={renderedList} toggleComplete={toggleComplete} deleteItem={deleteItem}/>
    </>
  );
};

export default Todo;
