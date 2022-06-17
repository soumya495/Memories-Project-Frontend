import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Home from './Pages/Home'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './Pages/Auth'

function App() {
  return (
    <div className='container w-[95%] max-w-[1400px] mx-auto'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
      <ToastContainer position='top-center' />
    </div>
  )
}

export default App
