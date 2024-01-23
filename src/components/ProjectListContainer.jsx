import React, { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { ProjectList } from './ProjectList'
import { SubNavBar } from './SubNavBar'

export const ProjectListContainer = () => {
    const [myProjects, setMyProjects] = useState([])

    //obtener el listado de proyectos
    const projectList = () => {
        const db = getFirestore()
        const itemsCollection = collection(db, "Project") 
        getDocs(itemsCollection)
            .then((result) => {
                const list = result.docs.map((project) => {
                    return {
                        id: project.id,
                        ...project.data()
                    }
                })
                setMyProjects(list)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        projectList()
    }, []) 

    return (
        <>
            <SubNavBar state={0}/>
            <Container maxW='full' paddingTop='30px' paddingLeft='60px' paddingRight='60px' >
                {/* se envía como propiedad el listado, y la funcion para volver a obtener el listado de proyectos */}
                {<ProjectList projects={myProjects} refreshList ={projectList} />}
            </Container>

        </>
    )
}
