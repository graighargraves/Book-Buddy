import { useState } from 'react'
import bookLogo from './assets/books.png'
import AllBooks from './components/Books'
import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from './components/Navigations'
import SingleBook from './components/SingleBook'

function App() {
  // const [token, setToken] = useState(null)
  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element={<AllBooks />} />
      <Route path="/books/:id" element={<SingleBook />} />
     </Routes>
    </>
  )
}

export default App;
