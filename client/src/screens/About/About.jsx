
import { useNavigate } from 'react-router-dom'
import './About.css'

export default function About({profile}){
    const nav = useNavigate()
    return (

        <div className="about">
            <h1>What's <span className='violet'>Mamoo</span>?</h1>
            <p id="about-p">A <span className='violet'>Mamoo</span> is a Memory. Good Times, Tough Times, Milestones, and Reminders, a <span className='violet'>Mamoo</span> is a way to quantify important
            events in your life. <span className='violet'>Mamoos</span> are a journaling tool, a reminder tool, or just a way to keep track
            of progress towards Milestones in your life.  Whatever's important to you can be a <span className='violet'>Mamoo</span>.   </p>
            
            {profile === null ? <button onClick={()=>{nav('/signup')}}>Sign Up ></button> : <button onClick={()=>(nav('/mymamoos'))}>Home ></button>}
            
            
        </div>

    )
}