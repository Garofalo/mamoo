import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMamoo, logOut, deleteMamoo } from "../../services/apiConfig"
import './MamooDetail.css'







export default function MamooDetail({profile, today}){
    const { id } = useParams()
    const [mamoo, setMamoo] = useState({})

    const [time, setTime] = useState(today)
    const nav = useNavigate()

useEffect(()=>{
    const fetchMamoo= async()=>{
    const res = await getMamoo(id)

    setMamoo(res)

    }
    fetchMamoo()
},[id])

useEffect(()=>{
    const timer = function (){
        setTime(today - mamoo.when)
    }
    timer()
},[mamoo, today])

const handleError = async () => {
    const res = await logOut()
    if (res){
        nav('/')
    }
}
const handleDelete = async() => {
    const res = await deleteMamoo(id)
    if (res){
        nav(`/mymamoos`)
    }
}
const isThereAnS = time === 1 ? 'y' : "ys"
const message = time === 0 ? "Today" : `${parseInt(time)} da${isThereAnS} ago, today  `

function renderError(){
        if (profile.pk === mamoo.user){
        return (
        <div className="detail">
            <div className="top-detail">
                <h1 id="message">{message}</h1>
                <h1>{mamoo.title}</h1>
                <h1 className="violet">{mamoo.type}</h1>
                
                <h3>{mamoo.what}</h3>
                <h2 className="italics">{mamoo.where}</h2>
            </div>
            <div className="bottom-detail">
            
                <button onClick={()=>nav(`/mymamoos`)}>Back</button>
            
                <button id="delete" onClick={handleDelete}>Delete This Mamoo</button>
            </div>
        </div>
          )
        } else {
          return (
              <>
              <button onClick={handleError}>Sorry, There's an Error, Sign Out and Try Again</button>
              </>
          )
    }
}




    return(
        <div>
            
        {renderError()}
    
    
        </div>
    )
}