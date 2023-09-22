import React from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Answer from '../components/Answer'
import { Route, Routes } from 'react-router-dom'
import Forum from '../components/Forum'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />

       
        <Route path="/"
         element={<Forum/>} />
        <Route path="/answer/:questionId" 
        element={<Answer/>} />

       
       
        <Route path="*" element={ <div>
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>} />
        </Routes>
    </div>
  )
}

export default AllRoutes