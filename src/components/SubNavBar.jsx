import React from 'react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Container, Text, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* Barra de navegación secundaria, cambia su contenido y apariencia según el estado que recibe
    Estado === 0 : se muestra en el inicio
    Estado === 1 : modo edición (actualizar un proyecto existente)
    Estado === 2 : crear un proyecto
*/
export const SubNavBar = ({ state }) => {
    const content = () => {
        if (state === 0) {
            return (
                <>
                    <Flex>
                        <Text pt={2} fontFamily="heading" fontSize='20px' fontWeight={600}>My projects</Text>
                    </Flex>
                    <Spacer />
                    <Flex pt={1}>
                        <Button
                            leftIcon={<AddIcon />}
                            color='white'
                            fontFamily='body'
                            fontWeight={400}
                            bg='#F5222D'
                            gap='4px'
                            maxW='134px'
                            maxH='40px'
                            borderRadius='4px'
                        >
                            <Link to='/edit'>Add Project</Link>
                        </Button>
                    </Flex>
                </>
            )
        } else {
            return (
                <>
                    <Flex alignItems="center">
                        <Link to='/'>
                            <Button bg='#FFFFFF' leftIcon={<ArrowBackIcon />}>
                                <Text fontFamily='heading' fontWeight={400} fontSize='12px' lineHeight='22px'>Back</Text>
                            </Button>
                        </Link>
                        {/* Estado === 1 : modo edición | Estado === 2 : crear un proyecto */}
                        <Text fontFamily="heading" fontSize='24px' fontWeight={600} lineHeight='32px'>{state === 1 ? "Edit project" : "Add Project"}</Text>
                    </Flex>
                </>
            )
        }
    }
    return (
        <Container maxW='full' bg='#FFFFFF' borderColor='#D9D9D9' borderWidth={1} borderBottomStyle='blur'>
            <Container maxW='95%' height='56px' bg='#FFFFFF' pt='5px'>
                <Flex alignContent='center'>{content()}</Flex>
            </Container>
        </Container>
    )
}