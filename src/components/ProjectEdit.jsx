import React, { useContext, useEffect, useState } from 'react'
import { FormControl, FormLabel, Button, FormErrorMessage, Input, FormHelperText, Select, Container, Flex } from '@chakra-ui/react'
import { SubNavBar } from './SubNavBar'
import { ProjectContext } from '../context/ProjectManagerContext'

export const ProjectEdit = ({ isEditMode, projectData, onSave }) => {
  const { employeeList, managerList, statusList } = useContext(ProjectContext)
  const [formData, setFormData] = useState({
    ...projectData
  })

  const [validate, setValidate] = useState({})

  useEffect(() => {
    /* establecer el valor a las propiedades 
      de acuerdo a si el formulario se encuentra en modo edición.
      Si no lo está, asigna los vaores con el primer valor de las listas desplegables
      que se obtienen de la base de datos
    */
    setFormData({
      projectManager: isEditMode ? formData.projectManager : managerList[0].name,
      employee: isEditMode ? formData.employee : employeeList[0].name,
      status: isEditMode ? formData.status : statusList[0].name,
      ...projectData
    });
  }, [projectData, isEditMode]);

  /* manejador de eventos para los cambios en los campos del formulario */
  const handleChange = (e) => {
    /* actualiza el estado de los datos del formulario */
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /* manejador de eventos para validar los datos del formulario */
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
      Toastify({
        text: "Success !",
        duration: 3000
      }).showToast();
    }
    else {
      Toastify({
        text: "Please, complete missing fields !",
        duration: 3000
      }).showToast();
    }
  }

  /* verifica que los campos name y description no se encuentren vacios */
  const validateForm = () => {
    const errors = {}

    if (!formData.name || !formData.name.trim()) {
      errors.name = "Name is required!";
    }

    if (!formData.description || !formData.description.trim()) {
      errors.description = "Description is required!";
    }

    setValidate(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <>
      {/* muestra la barra de navegacion secundaria.
          el estado = 1 representa la edición de un proyecto existente. 
          De lo contrario, el estado = 2 representa la creación de un proyecto nuevo */}
      {isEditMode ? <SubNavBar state={1} /> : <SubNavBar state={2} />}


      {/* presenta el formulario */}
      <Container
        maxW={664} maxH={544}
        borderRadius={4} bg='#FFFFFF'
        marginTop={30}
      >
        <Flex justifyContent='center'>
          <FormControl alignContent='center'
            pt={5} pb={5}
            maxW={584} maxH={544}
          >
            <FormLabel fontFamily='body' fontSize={14} fontWeight={400}>Project name</FormLabel>
            <Input
              type='text' name='name'
              fontFamily='body' fontSize={14} fontWeight={400} color='#595959'
              value={formData.name} onChange={handleChange}
            >
            </Input>

            <FormLabel mt={6} fontFamily='body' fontSize={14} fontWeight={400}>Description</FormLabel>
            <Input
              type='text' name='description'
              fontFamily='body' fontSize={14} fontWeight={400} color='#595959'
              value={formData.description} onChange={handleChange}
            >
            </Input>

            <FormLabel mt={6} fontFamily='body' fontSize={14} fontWeight={400}>Project manager</FormLabel>
            <Select
              fontFamily='body' fontSize={14} fontWeight={400} color='#595959'
              name='projectManager' value={formData.projectManager} onChange={handleChange}
            >
              {managerList.map((emp) => (
                <option
                  fontFamily='body' fontSize={14}
                  key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </Select>

            <FormLabel mt={6} fontFamily='body' fontSize={14} fontWeight={400}>Assigned to</FormLabel>
            <Select
              fontFamily='body' fontSize={14} fontWeight={400} color='#595959'
              name='employee' value={formData.employee} onChange={handleChange}
            >
              {employeeList.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}

            </Select>

            <FormLabel mt={6} fontFamily='body' fontSize={14} fontWeight={400}>Status</FormLabel>
            <Select
              fontFamily='body' fontSize={14} fontWeight={400} color='#595959'
              name='status' value={formData.status} onChange={handleChange}>
              {statusList.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </Select>

            <Button
              mt={6}
              color='#FFFFFF' bg="#F5222D"
              fontSize={16} fontFamily='body'
              fontWeight={400}
              type='submit'
              onClick={handleSubmit}
            >
              {isEditMode ? 'Save changes' : 'Create project'}</Button>
          </FormControl>
        </Flex>
      </Container>
    </>
  )
}
