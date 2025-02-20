import { Link } from "react-router-dom"
import {useSelector} from 'react-redux'

function AdminHeader() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
     <Link to="/admin">
     <h1 className='font-bold'>Admin</h1>
     </Link>
     <ul className='flex gap-4 '>
       
            <Link to="/admin/login">
              <li>Login</li>
            </Link>
     </ul>
      </div>
    </div>
  )
}

export default AdminHeader
