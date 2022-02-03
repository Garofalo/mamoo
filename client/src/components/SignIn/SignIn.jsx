import React from 'react'
import { useState } from 'react'
import { logIn } from '../../services/apiConfig'
import { useNavigate } from 'react-router-dom'


export default function SignIn({ setProfile, setToggle }) {

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
          setProfile(res.data)
          setToggle(e=>!e)
          nav(`/${res.data.pk}`)
        //   console.log(res)
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
    
      <form className='formR' >
        <p className='sign-up-form-text' >Username</p>
        <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />

        <p className='sign-up-form-text'>Password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        
      </form>
      <div className='error-buttons'>
          {renderError()}
        </div>
    </div>
  )
}
