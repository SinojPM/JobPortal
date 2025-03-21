import { Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth/Auth.tsx'
import '@mantine/core/styles.css';

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Auth/>} />
      <Route path='/' element={<Navigate to={"/login"}/>}/>
    </Routes>
    </>
  )
}

export default App
