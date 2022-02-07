import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../services/apiConfig'
import './SignUp.css'

export default function SignUp({ setProfile, setToggle, profile }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] =useState('')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const nav = useNavigate()


const onSignUp = async (e) => {
    e.preventDefault()
        if(password !== confirmPass){
          setIsError(true)
          setErrorMsg("Passwords Must Match")
      } else {
          const newUser = {
          username,
          password,
          }
          try {
            const res = await  signUp(newUser)
            if(res){
              setProfile(res)
              nav(`/mymamoos`)
            }
    
        } catch (error) {
          setIsError(true)
          setErrorMsg('Sign Up Details Invalid')
          console.log(error)
        } 
      } 
        
      }


  function renderError ()  {

    if (isError === true) {
      return (<>
        <h2 className='error-msg'>{errorMsg}</h2>
        <button className='buttonR' onClick={onSignUp} type="submit">Try Again</button>
      </>
      )
    } else {
      return <button className='buttonR' onClick={onSignUp} type="submit">Sign Up</button>
    }
  }
  return (
    <>
    {profile === null &&<div className='sign-up'>
      <form className='formR' >
        <h2 className='sign-up-form-text' >Username</h2>
        <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />

        <h2 className='sign-up-form-text'>Password</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <h2 className='sign-up-form-text'>Confirm Password</h2>
        <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

        
      </form>
      
      
          {renderError()}
        
        <div className='sign-up-bottom'>
                 <button id="about" onClick={()=>nav('/about')}>What's a Mamoo? Click Here</button>
          </div>
 
        </div>}
    </>
  )
}
