import { Pagination } from '@mantine/core';
import { useState, useEffect, useContext } from 'react';
// import { changeItemsShown } from '../../Context/Settings';
import { Settingscontext} from '../../Context/Settings';


function List ({ list, toggleComplete }) {

  const states = useContext(Settingscontext)

  const [activePage, setActivePage] = useState(1);
  const [displayed, setDisplayed] = useState([]);

  const renderResults = list.map(item => (
      <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => toggleComplete(item.id)}> Complete: {item.complete.toString()}
        </div>
        <hr />
      </div>
    ));

    // console.log(renderResults);

    useEffect(()=>{
      console.log(states.itemsShown)
      let startIndex = (activePage - 1)* states.itemsShown;
      let endIndex = startIndex + states.itemsShown;
      setDisplayed(renderResults.slice(startIndex, endIndex))
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, activePage])

    console.log(displayed)

  return(
    <>
    {displayed}
    <Pagination 
    total={Math.ceil(list.length/3)} 
    value = {activePage}
    onChange={setActivePage}
    
    />
    </>



  )

}

export default List;