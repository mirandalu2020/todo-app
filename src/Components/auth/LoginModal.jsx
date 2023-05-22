import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Box } from '@mantine/core';
import {
  IconLogin,
} from '@tabler/icons-react';

function LoginModal({ handleChange, handleSubmit, login, classes}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
    
    <Modal opened={opened} onClose={close} title="Authentication" centered>
    <Box maw={300} mx="auto">
      <form onSubmit={(e)=>handleSubmit(e, login)}>
            <TextInput
              placeholder="UserName"
              name="username"
              onChange={handleChange}
            />
            <TextInput
              placeholder="PassWord"
              name="password"
              onChange={handleChange}
            />

        <Group position="right" mt="md">
          <Button type="submit">
          <IconLogin className={classes.linkIcon} stroke={1.5} />
          <span>Login</span>
          </Button>
        </Group>
      </form>
    </Box>
        
      </Modal>
      <Group position="center">
        <Button onClick={open}>Login</Button>
      </Group>
    </>
  );
}

export default LoginModal;