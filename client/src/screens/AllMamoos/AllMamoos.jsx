import { getMamoos, getMyMamoos } from "../../services/apiConfig"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { sortMamoos } from "../../components/MamooSorter/MamooSorter"
import './AllMamoos.css'


export default function AllMamoos({profile, today}){

    
    const [myMamoos, setMyMamoos] = useState([])
    const [sortedMamoos , setSortedMamoos] = useState(null)
    const nav = useNavigate()
   

    useEffect(()=>{
        const fetchMyMamoos = async ()=>{
            const res = await getMyMamoos()
            
            setMyMamoos(res)
        }
        fetchMyMamoos()
    }, [profile])

const mappedMoos = sortedMamoos === null ? myMamoos.map(
        (mam) => <div>
            <h1 className="mamoo-link" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{mam.title}</h1>
            <h2>{`${today - mam.when} days ago`}</h2>
        </div>): sortedMamoos.map(
        (mam) => <div>
            <h1 className="mamoo-link" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{mam.title}</h1>
            <h2>{`${today - mam.when} days ago`}</h2>
        </div>)


const handleChange = (e) => {
    const type = e.target.value
    
    
    const output = sortMamoos(myMamoos, type)

    setSortedMamoos(output)
  };




    return (
        <div>
            <div className="box">
                <select name="sort" onChange={handleChange}>
                    <option value="Most Distant">Most Distant</option>
                    <option value="Most Recent">Most Recent</option>
                    <option value="Good Times">Good Times</option>
                    <option value="Tough Times">Tough Times</option>
                    <option value="Milestones">Milestones</option>
                    <option value="Reminders">Reminders</option>
                </select>
            </div>
            <div className="mapped-moos">
                {mappedMoos}
            </div> 
        <button onClick={()=>nav('/create')}>create</button>
        </div>
    )
}