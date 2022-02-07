import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMyMamoos } from "../../services/apiConfig"
import { useNavigate } from "react-router-dom"
import SignIn from "../SignUp/SignUp"



export default function UserHome({ profile, setProfile, today}){
    const nav = useNavigate()
    const {id} = useParams()
    const [mamoos, setMamoos] = useState([])

useEffect(()=>{
    if (id){
        const fetchMamoos = async()=>{
            console.log('going')
            const res = await getMyMamoos()
            setMamoos(res.reverse())
        }
    fetchMamoos()       
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
 
        
        <div>
            <div>
                <h1>Your Recent Mamoos</h1>
            </div>
            <div>{mamooList()}</div>
            <button onClick={()=>(nav('/mymamoos/'))}>All Mamoos</button>
        </div>}
    </div>)
}