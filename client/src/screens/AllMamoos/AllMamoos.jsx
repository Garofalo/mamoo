import {  getMyMamoos } from "../../services/apiConfig"
import { useState ,useEffect } from "react"
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
            
            setMyMamoos(res.reverse())
        }
        fetchMyMamoos()
    }, [profile])

const mappedMoos = sortedMamoos === null ? myMamoos.map(
        (mam) => <div>
            <h1 className="mamoo-link" >{mam.title}</h1>
            <h2 className="violet hover" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{`${today - mam.when} days ago >`}</h2>
        </div>): sortedMamoos.map(
        (mam) => <div>
            <h1 className="mamoo-link" >{mam.title}</h1>
            <h2 className="violet hover" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{`${today - mam.when} days ago >`}</h2>
        </div>)


const handleChange = (e) => {
    const type = e.target.value
    
    
    const output = sortMamoos(myMamoos, type)

    setSortedMamoos(output)
  };




    return (
        <div>
            <h1>Memory Lane</h1>
            <div className="box">
                <select name="sort" onChange={handleChange}>
                    <option value="Most Recent">Most Recent</option>
                    <option value="Most Distant">Most Distant</option>
                    
                    <option value="Good Times">Good Times</option>
                    <option value="Tough Times">Tough Times</option>
                    <option value="Milestones">Milestones</option>
                    <option value="Reminders">Reminders</option>
                </select>
            </div>
            <div className="mapped-moos">
                {mappedMoos}
            </div> 
        
        </div>
    )
}