import * as React from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  theme
} from '@chakra-ui/react'

function ChakraRightDrawer(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  theme.components = {
    Drawer: {
      variants: {
        alwaysOpen: {
          parts: ['dialog, dialogContainer'],
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  };
  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen} color="var(--textmain)" bg="var(--backgroundmain)">
        Open
      </Button>
      <Drawer variant='alwaysOpen'
        trapFocus={false}
        blockScrollOnMount={false}
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        closeOnOverlayClick={false}
      >
        {/* <DrawerOverlay display="none" /> */}
        <DrawerContent h="100%" mt="10vh" w="30vw">
          <DrawerCloseButton color="var(--textmain)" bg="var(--backgroundmain)" />
          <DrawerHeader color="var(--textmain)" bg="var(--backgroundmain)">Create your account</DrawerHeader>

          <DrawerBody color="var(--textsecond)" bg="var(--backgroundsecond)">
            <Input color="var(--textmain)" bg="var(--backgroundmain)" placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter color="var(--textmain)" bg="var(--backgroundmain)">
            <Button variant='outline' mr={3} onClick={onClose} color="var(--textmain)" bg="var(--backgroundmain)">
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default ChakraRightDrawer