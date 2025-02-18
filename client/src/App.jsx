 import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'




function App() {


  return (
    <>
     <BrowserRouter>
     <Header/>
     <Routes>
     <Route   path='/'  element={<Home/>}/>
     <Route   path='/about'  element={<About/>}/>
     <Route   path='/login'  element={<Login/>}/>
     <Route   path='/signup'  element={<Signup/>}/>

     <Route element={<PrivateRoute/>}>
    <Route   path='/profile'  element={<Profile/>}/>
     </Route>

      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
