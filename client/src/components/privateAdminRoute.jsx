import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateAdminRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser ? <Outlet/> : <Navigate to='/admin/login'/>
}

export default PrivateAdminRoute
