import { addDoc, collection, getDoc, getFirestore, setDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectEdit } from './ProjectEdit'
import { serverTimestamp } from 'firebase/firestore'

export const ProjectEditContainer = () => {
  const { id } = useParams()
  const [myProject, setMyProject] = useState([])
  const [isEditMode, setIsEditMode] = useState(!!id)


  useEffect(() => {
    console.log(isEditMode)
    if (isEditMode) {
      const db = getFirestore();
      const ref = doc(collection(db, "Project"), id);

      getDoc(ref)
        .then((result) => {
          setMyProject({ id: result.id, ...result.data() });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEditMode, id]);

  const handleSave = (formData) => {
    let data = { ...formData, creationDate: serverTimestamp() }
    try {
      if (isEditMode) { /* isEditMode (true) -> actualizar un documento en la base de datos */
        const db = getFirestore()
        const detailCollection = collection(db, "Project")
        const ref = doc(detailCollection, id)

        setDoc(ref, data)
          .then(() => {"Project updated succesfully"})
          .catch(() => {"Error updating project", error})

      } else {
        /* crea un documento (proyecto) */
        const db = getFirestore()
        const projectCollection = collection(db, "Project")
        addDoc(projectCollection, data)
          .then(() => {"Project added succesfully"})
          .catch(() => {"Error creating a new project", error })
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <ProjectEdit isEditMode={isEditMode} projectData={myProject} onSave={handleSave}></ProjectEdit>
    </>
  )
}
