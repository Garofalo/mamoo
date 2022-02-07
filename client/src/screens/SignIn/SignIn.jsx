import React from 'react'
import { useState } from 'react'
import { logIn } from '../../services/apiConfig'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'


export default function SignIn({ setProfile }) {

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
          const res = await logIn(newUser)

          if (res){
          setProfile(res)
          nav(`/mymamoos`)
        
          }
          
        } catch (error) {
          setIsError(true)
          setErrorMsg(error.message)
          console.log(error)
        }
      }

  function renderError ()  {

    if (isError === true) {
      return (<>
        <h2>{errorMsg}</h2>
        <button className='buttonR' id="sign-in" onClick={onSignUp} type="submit">Try Again</button>
      </>
      )
    } else {
      return <button className='buttonR' id="sign-in" onClick={onSignUp} type="submit">Submit Details</button>
    }
  }
  return (
    <div className='sign-in'>
        <div className='top-sign-in'>
      <form className='formR' >
        <h2 className='sign-up-form-text' >Username</h2>
        <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />

        <h2 className='sign-up-form-text'>Password</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        
      </form>
      </div>
      <div className='error-buttons'>
          {renderError()}
        </div>
        <div className='bottom-sign-in'>  
            <button className="nav-button" onClick={()=>nav('/signup')}>No Account? Click Here</button>
            <button className="nav-button" onClick={()=>nav('/about')}>What's a Mamoo? Click Here</button>
        </div>
        
    </div>
  )
}
