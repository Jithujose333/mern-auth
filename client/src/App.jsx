
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import AdminHeader from './components/AdminHeader';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';



function UserRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

function AdminRoutes() {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
