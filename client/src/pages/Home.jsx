import React from 'react'

export default function Home() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4  bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent leading-normal'>Welcome to my Auth App!</h1>
      <p className='mb-4 text-slate-500 text-1xl  font-medium leading-relaxed text-justify' > 
      This user authentication app provides a seamless experience for managing user profiles,
       including updating details, changing profile pictures, signing out, and account deletion.
        It utilizes React and Redux Toolkit for state management, ensuring efficient updates and
         persistence. The app enables secure profile updates with real-time feedback and image preview 
         functionality. While the sign-out action executes successfully, refining state updates to
          reflect changes immediately in the UI would improve usability. Overall, the app is well-structured,
           offering essential authentication features with a user-friendly interface.
      </p>
    </div>
  )
}

