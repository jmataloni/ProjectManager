import { ProjectManagerProvider } from './context/ProjectManagerContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import {ProjectEditContainer} from './components/ProjectEditContainer'
import {ProjectListContainer} from './components/ProjectListContainer'

function App() {

  return (
    <>
      <ProjectManagerProvider>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route exact path="/" element={<ProjectListContainer/>}/>
            <Route exact path="/edit" element={<ProjectEditContainer/>}/>
            <Route exact path="/edit/:id" element ={<ProjectEditContainer />}/>
          </Routes>

        </BrowserRouter>
      </ProjectManagerProvider>
    </>
  )
}

export default App