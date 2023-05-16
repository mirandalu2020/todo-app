import { Pagination } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { useState, useEffect, useContext } from 'react';
import { SettingsContext} from '../../Context/Settings';

// import { IconChevronDown } from '@tabler/icons-react';


function List ({ list, toggleComplete }) {

  const states = useContext(SettingsContext)
  const [activePage, setActivePage] = useState(1);
  const [displayed, setDisplayed] = useState([]);

  const renderResults = list.map(item => (
      <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div data-testid = 'completion-status' onClick={() => toggleComplete(item.id)}> 
        Complete: {item.complete.toString()}
        </div>
        <hr />
      </div>
    ));
    // console.log(renderResults);

    const handleItemsShownChange = (e) =>{
      console.log(e)
      states.setItemsShown(e);
    }

    const setPage = () =>{
      console.log(states.itemsShown)
      let startIndex = (activePage - 1)* states.itemsShown;
      let endIndex = startIndex + states.itemsShown;
      setDisplayed(renderResults.slice(startIndex, endIndex))
    }

    useEffect(()=>{
      setPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, activePage, states.itemsShown])
    // console.log(displayed)

  return(
    <div data-testid='todo-container'>
      <NumberInput
      onChange={handleItemsShownChange}
      defaultValue={3}
      label="Items shown per page"
      />
      
    {displayed}
    <Pagination 
    total={Math.ceil(list.length/3)} 
    value = {activePage}
    onChange={setActivePage}
    />
    </div>
  )

}

export default List;