import React from 'react';
import { Project } from './Project';
import { Container, Thead, TableContainer, Flex, Table, Tr, Th,  useBreakpointValue } from '@chakra-ui/react';
import { doc, deleteDoc, getFirestore, collection, getDocs } from "firebase/firestore";

export const ProjectList = ({ projects, refreshList }) => {

    const hideHeader = useBreakpointValue({base: true, sm: false})
    
    /* eliminar el documento de la base de datos por su id */
    const onDelete = (id) => {
        try {
            const db = getFirestore()
            const dCollection = collection(db, "Project")
            const ref = doc(dCollection, id)
            deleteDoc(ref, id)
                .then(() => {"project deleted succesfully"})
                .catch(() => {"error deletinng project"})
        }
        catch (error) {
            console.log(error)
        }
        refreshList()
    }
    
    const StyledHeader = ({ children }) => {
        return (
            <Th
                textTransform='capitalize'
                fontStyle='body' fontSize={14}
                fontWeight='semibold'
                color='#000000D9'
            >
                {children}
            </Th>)
    }

    return (
        <>
            <TableContainer>
                <Table variant='simple' bg="#FFFFFF" borderBottomWidth='3px' boxShadow='#D9D9D9'>
                    <Thead height='60px' display={hideHeader ? 'none' : 'table-header-group'}>
                        <Tr>
                            <StyledHeader>Project info</StyledHeader>
                            <StyledHeader>Project manager</StyledHeader>
                            <StyledHeader>Assigned to</StyledHeader>
                            <StyledHeader>Status</StyledHeader>
                            <StyledHeader>Action</StyledHeader>
                        </Tr>
                    </Thead>
                    {projects.map((p) => (
                        <Project
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            description={p.description}
                            employee={p.employee}
                            projectManager={p.projectManager}
                            status={p.status}
                            creationDate={p.creationDate}
                            onDelete={onDelete}
                        />
                    ))}
                </Table>
            </TableContainer>
        </>
    )
}
