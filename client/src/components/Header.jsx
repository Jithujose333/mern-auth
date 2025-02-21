import { Link } from "react-router-dom"
import {useSelector} from 'react-redux'

function Header() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
     <Link to="/">
     <h1 className='font-bold text-2xl bg-gradient-to-bl from-green-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent leading-normal'>Auth App</h1>
     </Link>
     <ul className='flex gap-4 '>
        <Link to='/'>
        <li>Home</li>
        </Link>
        <Link to='about'>
        <li>About</li>
        </Link>
        {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser?.profilePicture || '/default-profilepic.jpg'}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover cursor-pointer"
              />
            </Link>
          ) : (
            <Link to="/login">
              <li>Login</li>
            </Link>)}
     </ul>
      </div>
    </div>
  )
}

export default Header
