import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMamoo, logOut, deleteMamoo } from "../../services/apiConfig"







export default function MamooDetail({profile}){
    const { id } = useParams()
    const [mamoo, setMamoo] = useState({})
    const [now, setNow ] = useState('')
    const nav = useNavigate()

useEffect(()=>{
    const fetchMamoo= async()=>{
    const res = await getMamoo(id)
    setMamoo(res)
    setNow(parseInt((Date.now())/(1000*60*60*24)))
    }
    fetchMamoo()
},[id])

const handleError = async () => {
    const res = await logOut()
    if (res){
        nav('/')
    }
}
const handleDelete = async() => {
    const res = await deleteMamoo(id)
    if (res){
        nav(`/${profile.pk}`)
    }
}

function renderError(){
        if (profile.pk === mamoo.user){
        return (
        <>
            <button onClick={()=>nav(`/${profile.pk}`)}>Back</button>
            <button onClick={handleDelete}>delete</button>
        </>
          )
        } else {
          return (
              <>
              <button onClick={handleError}>Sorry, Error, Sign Out and Try Again</button>
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