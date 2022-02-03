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
},[])

    return(
    <div>
        {
            mamoos && mamoos.map((mam)=>(
                <p>{mam.title}</p>
            ))
        }
        <button onClick={()=>nav('/create')}>create</button>
    </div>)
}