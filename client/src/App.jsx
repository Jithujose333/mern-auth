
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import AdminHeader from './components/AdminHeader';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateAdminRoute from './components/privateAdminRoute';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function UserRoutes() {
  return (
    <>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
        <Route element={ <> <Header />  <Outlet />  </>}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          </Route>
          </Route>
      </Routes>
    </>
  );
}

function AdminRoutes() {
  return (
    <>
    
      <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route element={<PrivateAdminRoute />}>
        <Route element={<>  <AdminHeader />  <Outlet /></>}>
        <Route path="/dashboard" element={<AdminDashboard/>} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
