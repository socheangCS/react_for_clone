import React, { useEffect, useState } from 'react'
import { useCS } from './contexts/CScontext'
import Logo from "./assets/cs_white.png";
function App() {
  const {getData} = useCS()
  const [username,setUsername] = useState("")
  useEffect(()=>{
    getData().then((res)=>{
      setUsername(res)
    })
  },[getData])
  return (
    <div  className="w-[100%] h-screen bg-black text-white items-center flex justify-center">
      <div className='flex items-center flex-col gap-5'>
         <img src={Logo} alt="logo" className='size-32' />
         {username && username}
      </div>
    </div>
  )
}

export default App

