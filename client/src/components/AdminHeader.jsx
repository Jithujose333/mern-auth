import { Link } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { signOut } from "../redux/user/userSlice";

function AdminHeader() {
  const {currentUser} = useSelector((state)=> state.user)
  const dispatch = useDispatch();

  const handleSignOut = async()=>{
    try {
      await fetch('/api/user/signout')
      dispatch(signOut())
      console.log("signout successful")
     
    } catch (error) {
      console.log(error.message)
    }
   }
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
     <Link to="/admin">
     <h1 className='font-bold text-2xl bg-gradient-to-bl from-green-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent leading-normal'>Admin</h1>
     </Link>
     <ul className='flex gap-4 '>
       {currentUser?
        <Link to="/admin/login">
        <li onClick={handleSignOut}className="text-red-700">Signout</li>
      </Link>:
      <Link to="/admin/login">
      <li>Login</li>
    </Link>
       }
            
     </ul>
      </div>
    </div>
  )
}

export default AdminHeader
