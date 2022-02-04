import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMamoos } from "../../services/apiConfig"
import { useNavigate } from "react-router-dom"


export default function UserHome({toggle, profile}){
    const nav = useNavigate()
    const {id} = useParams()
    const [mamoos, setMamoos] = useState([])

useEffect(()=>{

    const fetchMamoos = async()=>{
        const res = await getMamoos()
        const data = res.filter((mam) =>  {return mam.user === profile.pk})
        setMamoos(data)
    }
    fetchMamoos()
},[id])

    return(
    <div>{profile.username &&
        <h1>{`Welcome, ${profile.username}`}</h1>}
        {
            mamoos.length>0 ? mamoos.map((mam)=>(
                <p onClick={()=>nav(`/mamoo/${mam.pk}`)}>{mam.title}</p>
            )) :
            <div>You Need To Add A Mamoo!</div>
        }
        
        <button onClick={()=>nav('/create')}>create</button>
    </div>)
}