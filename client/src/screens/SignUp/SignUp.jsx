import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { logOut } from '../../services/apiConfig'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../services/apiConfig'
import './SignUp.css'

export default function SignUp({ setProfile, setToggle, profile }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const nav = useNavigate()


const onSignUp = async (e) => {
    e.preventDefault()
        const newUser = {
          username,
          password,
        }
        try {
          const res = await  signUp(newUser)
          if(res){
              setProfile(res)
              nav(`/${res.pk}`)
          }
    
        } catch (error) {
          setIsError(true)
          setErrorMsg('Sign Up Details Invalid')
          console.log(error)
        }  
        
      }


  function renderError ()  {

    if (isError === true) {
      return (<>
        <h2>{errorMsg}</h2>
        <button className='buttonR' onClick={onSignUp} type="submit">Try Again</button>
      </>
      )
    } else {
      return <button className='buttonR' onClick={onSignUp} type="submit">Sign Up</button>
    }
  }
  return (
    <div className='sign-up'>
    {profile === null &&<>
      <form className='formR' >
        <h2 className='sign-up-form-text' >Username</h2>
        <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />

        <h2 className='sign-up-form-text'>Password</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        
      </form>
      
      <div className='error-buttons'>
          {renderError()}
        </div>
        <div className='sign-up-bottom'>
                 <button className="nav-button" onClick={()=>nav('/about')}>What's a Mamoo? Click Here</button>
          </div>
 
        </>}
    </div>
  )
}