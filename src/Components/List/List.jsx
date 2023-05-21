import { Pagination } from '@mantine/core';
import { Card, Text, Badge, Group, Button } from '@mantine/core';
import { useState, useEffect, useContext } from 'react';
import { SettingsContext} from '../../Context/Settings';

// import { IconChevronDown } from '@tabler/icons-react';


function List ({ list, toggleComplete, deleteItem }) {

  const states = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);
  const [displayed, setDisplayed] = useState([]);

  const renderResults = list.map( (item) => {
    return <div key={item.id}>
    <Card shadow="sm" padding="lg" radius="md" withBorder>

    <Group position="apart" mt="md" mb="xs">
      <Text weight={500}>Assigned to: {item.assignee}</Text>

      {item.complete ? 
      <Badge color="green" variant="light" onClick={() => toggleComplete(item.id)}>
      {`Completed`}
      </Badge> :
      <Badge color="pink" variant="light" 
      onClick={() => toggleComplete(item.id)}>
      {`pending`}
      </Badge>}


    </Group>

    <Text size="sm" color="dimmed">
    Task: {item.text}
    </Text>
    <Text size="sm" color="dimmed">
    Difficulty: {item.difficulty}
    </Text>
    <Button variant="subtle" color="red" size="xs" compact onClick={() =>deleteItem(item.id)}>
      DELETE
    </Button>
  </Card>
      </div>
});
    // console.log(renderResults);

    const setPage = () =>{
      // console.log(states.itemsShown)
      let startIndex = (activePage - 1)* states.itemsShown;
      let endIndex = startIndex + states.itemsShown;
      setDisplayed(renderResults.slice(startIndex, endIndex))
      // console.log(displayed)
    }

    useEffect(()=>{
      setPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, activePage, states.itemsShown])
    // console.log(displayed)

  return(
    <div data-testid='todo-container'>
      
    {displayed}
    <Pagination 
    total={Math.ceil(list.length/states.itemsShown)} 
    value = {activePage}
    onChange={setActivePage}
    />
    </div>
  )
}

export default List;