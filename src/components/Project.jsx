import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Flex, Tr, Tbody, MenuButton, useBreakpointValue} from '@chakra-ui/react'
import { Td, Badge, Menu, Avatar, MenuItem, MenuList, Text, Button, Image } from '@chakra-ui/react'

import React from 'react'
import { Link } from 'react-router-dom';


export const Project = (p) => {
    const seconds = p.creationDate ? p.creationDate.seconds : 0
    const hide = useBreakpointValue({ base: true, sm: false })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                p.onDelete(id) //eliminar proyecto
                Toastify({
                    text: "Your file has been deleted.",
                    duration: 3000
                }).showToast();

            }
        })
    }
    return (
        <>
            <Tbody>
                <Tr>
                    <Td>
                        <Flex direction='column'>
                            <Text fontFamily='body' fontSize={14} color='#000000A6' fontWeight={400}>{p.name}</Text>
                            <Text fontSize={12} color='#00000073' fontWeight={400} >Creation date: {new Date(seconds * 1000).toLocaleString()}</Text>
                        </Flex>
                    </Td>
                    <Td display={hide ? 'none' : 'table-cell'}> {/* si está en vista mobile, oculta la columna */}
                        <Flex direction='row' gap='10px' alignItems='center'>
                            <Avatar maxW='30px' maxH='30px'
                                name={p.employee}
                                src='https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            />
                            <Text fontFamily='body' fontSize={14} color='#000000A6' fontWeight={400}>{p.projectManager}</Text>
                        </Flex>
                    </Td>
                    <Td>
                        <Flex direction='row' gap='10px' alignItems='center'>
                            <Avatar maxW='30px' maxH='30px'
                                name={p.employee}
                                src='https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            />
                            <Text fontFamily='body' fontSize={14} color='#000000A6' fontWeight={400}>{p.employee}</Text>
                        </Flex>
                    </Td>
                    <Td display={hide ? 'none' : 'table-cell'}> {/* si está en vista mobile, oculta la columna */}
                        <Badge
                            bg='#F5F5F5'
                            borderColor='#D9D9D9'
                            textTransform='capitalize'
                            color='#595959'
                            fontWeight={400}
                            pl={2}
                            border={1} borderRadius={4}
                            width={59} height={22}
                        >
                            {p.status}
                        </Badge>
                    </Td>
                    <Td>
                        <Menu>
                            <MenuButton as={Button} bg='#FFFFFF'>
                                <Image src="../more-2-fill.svg" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link to={`/edit/${p.id}`}>
                                        <Flex gap='20px' alignItems='center'>
                                            <EditIcon />
                                            <Text fontSize={12} fontFamily='body'>Edit</Text>
                                        </Flex>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => handleDelete(p.id)}>
                                    <Flex gap='20px' alignItems='center'>
                                        <DeleteIcon />
                                        <Text fontSize={12} fontFamily='body'>Delete
                                        </Text>
                                    </Flex>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Td>
                </Tr>
            </Tbody>
        </>
    )
}