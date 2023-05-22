import { useContext } from 'react';
import { Checkbox, Button, Group, Box, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SettingsContext } from '../../Context/Settings'
import './settings.scss'

const SettingsForm = () =>{

  const {hideCompleted, toggleHideCompleted, itemsShown, setItemsShown, sortMethod, changeSortMethod} = useContext(SettingsContext);

  const form = useForm({
    initialValues: {
      hideCompleted: hideCompleted,
      itemsShown: itemsShown,
      sortMethod: sortMethod,
    },
  });

  const handleItemsShownChange = (e) =>{
    console.log(e)
    setItemsShown(e);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    form.values.hideCompleted = hideCompleted;
    form.values.itemsShown = itemsShown;
    form.values.sortMethod = sortMethod;
    console.log(form.values)
    localStorage.setItem('userSettings', JSON.stringify(form.values));
  }

  return (
    <Box maw={300} mx="auto">
      
      <form onSubmit={handleSubmit}>
      <h3>Settings</h3>

    <Select
      label="Sort By"
      onChange={(e) => changeSortMethod(e)}
      placeholder="Sort By"
      data={[
        { value: 'difficulty_asc', label: 'Difficulty Ascending' },
        { value: 'difficulty_dsc', label: 'Difficulty Descending' },
      ]}
    />

        <NumberInput
      onChange={handleItemsShownChange}
      defaultValue={3}
      label="Items shown per page"
      />

        <Checkbox
          mt="md"
          label="Show Completed Tasks"
          onChange={()=> toggleHideCompleted()}
          // {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default SettingsForm;