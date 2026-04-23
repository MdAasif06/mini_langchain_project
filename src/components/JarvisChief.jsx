import React, { useState } from 'react'
import { askJarvis } from '../utils/askJarvis.js'
const JarvisChief = () => {

  const [humanMessage,sethumanMessage]=useState("")

  const handleInputChange=(e)=>{
    sethumanMessage(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    askJarvis(humanMessage)
  }


  return (
    <>
      <h1>Ask your recipes</h1>
      <form >
        <input type="text" value={humanMessage} onChange={handleInputChange} placeholder='ask your favriot recipes' />
        <button onClick={handleSubmit}>ask</button>
      </form>
    </>
  )
}

export default JarvisChief