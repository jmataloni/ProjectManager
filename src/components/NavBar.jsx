import React from 'react'
import { Container, Text, Flex} from '@chakra-ui/react'

export const NavBar = () => {

  return (
    <>
      <Container maxW='full' bg='#FFFFFF' borderColor='#D9D9D9' border={1}>
        <Container
          maxW='95%'
          height='57px'
          alignItems='center'
          fontSize='14px'
          color='#BDBDBD'>
          <Flex pt='15px'>
            <Text fontFamily='heading' fontSize='14px' fontWeight='600'>LOGO</Text>
          </Flex>
        </Container>
      </Container>
    </>
  )
}