import React, { createContext, useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export const ProjectContext = createContext()

export const ProjectManagerProvider = ({ children }) => {
  const [employeeList, setEmployeeList] = useState([])
  const [managerList, setManagerList] = useState([])
  const [statusList, setStatusList] = useState([])

  //obtiene toda la lista de empleados desde la base de datos
  useEffect(() => {
    const db = getFirestore();
    const employeeCollection = collection(db, "Employee");
    getDocs(employeeCollection)
      .then((result) => {
        const list = result.docs.map((emp) => {
          return {
            id: emp.id,
            ...emp.data()
          };
        });
        setEmployeeList(list);
      })
      .catch((error) => { console.log(error) });
  }, [])

  //obtiene toda la lista de Project manager desde la base de datos
  useEffect(() => {
    const db = getFirestore();
    const mCollection = collection(db, "ProjectManager");
    getDocs(mCollection)
      .then((result) => {
        const list = result.docs.map((m) => {
          return {
            id: m.id,
            ...m.data()
          };
        });
        setManagerList(list);
      })
      .catch((error) => { console.log(error) });
  }, [])

  //obtiene toda la lista de Status desde la base de datos
  useEffect(() => {
    const db = getFirestore();
    const sCollection = collection(db, "Status");
    getDocs(sCollection)
      .then((result) => {
        const list = result.docs.map((s) => {
          return {
            id: s.id,
            ...s.data()
          };
        });
        setStatusList(list);
      })
      .catch((error) => { console.log(error) });
  }, [])

  return (
    <ProjectContext.Provider value={{ employeeList, managerList, statusList }}>
      {children}
    </ProjectContext.Provider>
  )
}
