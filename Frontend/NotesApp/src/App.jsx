import { useState } from 'react'
import './App.css'
import Auth from './Pages/Auth/Auth'
import Notes from './Pages/Notes/Notes'

function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'))

  if(!token){
    return (
    <div className='app'>
      {/* <Notes/> */}
      <Auth setToken={setToken}/>
    </div>
  )
  }

  return (
    <div className='app'>
      <Notes token={token}/>
      {/* <Auth/> */}
    </div>
  )
}

export default App