import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMyMamoos } from "../../services/apiConfig"
import { useNavigate } from "react-router-dom"
import SignIn from "../SignUp/SignUp"
import './UserHome.css'



export default function UserHome({ profile, setProfile, today}){
    const nav = useNavigate()
    const {id} = useParams()
    const [mamoos, setMamoos] = useState([])

    
useEffect(()=>{
    if (id){

        const fetchMamoos = async()=>{
            
            const res = await getMyMamoos()
            setMamoos(res.reverse())
        
    fetchMamoos()  }     
    }else{

        nav('/signin')
    }
},[profile, id])


    const mamoosRecent = mamoos.slice(0, 3).map(
        (mam) => <div>
            <h1 className="mamoo-link" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{mam.title}</h1>
            <h2 className="violet">{`${today - mam.when} days ago`}</h2>
        </div>
      )

    
const mamooList = function(){
    if (mamoos.length === 0){
        return(<div>Let's Get You Mamooing</div>)
    } else {
        

    return mamoosRecent
    }
}

    return(
    <div>{profile === null ? <SignIn setProfile={setProfile} profile={profile} /> :
 
        
        <div className="home">
            
            <h1>Your Recent Mamoos</h1>
            
            <div>{mamooList()}</div>
            <button id="all-mamoos" onClick={()=>(nav('/mymamoos/'))}>Memory Lane</button>
        </div>}
    </div>)
}