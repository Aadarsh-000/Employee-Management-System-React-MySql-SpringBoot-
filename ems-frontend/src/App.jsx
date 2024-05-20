import './App.css'
import EmployeeComponent from './Components/EmployeeComponent'
import Footer from './Components/Footer'
import Header from './Components/Header'
import ListofEmployees from './Components/ListOfEmployees'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />

        <Routes>

          <Route path='/' element={<ListofEmployees />}></Route>
          <Route path='/employees' element={<ListofEmployees />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
          <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>

        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
