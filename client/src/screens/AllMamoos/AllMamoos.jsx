import { getMamoos, getMyMamoos } from "../../services/apiConfig"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { sortMamoos } from "../../components/MamooSorter/MamooSorter"



export default function AllMamoos({profile}){

    
    const [myMamoos, setMyMamoos] = useState([])
    const [sortedMamoos , setSortedMamoos] = useState(null)
    const nav = useNavigate()

    useEffect(()=>{
        const fetchMyMamoos = async ()=>{
            const res = await getMyMamoos()
            console.log(res)
            setMyMamoos(res)
        }
        fetchMyMamoos()
    }, [profile])

const mappedMoos = sortedMamoos === null ? myMamoos.map(
        (mam) => <div>
            <h1 className="mamoo-link" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{mam.title}</h1>
        </div>): sortedMamoos.map(
        (mam) => <div>
            <h1 className="mamoo-link" onClick={()=>nav(`/mymamoos/${mam.pk}`)}>{mam.title}</h1>
        </div>)


const handleChange = (e) => {
    const type = e.target.value
    
    
    const output = sortMamoos(myMamoos, type)
    setSortedMamoos(output)
  };




    return (
        <div>
            <div className="sorter">
                <select name="sort" onChange={handleChange}>
          <option value="Most Recent">Most Recent</option>
          <option value="Most Distant">Most Distant</option>
          <option value="Good Times">Good Times</option>
          <option value="Tough Times">Tough Times</option>
          <option value="Milestones">Milestones</option>
          <option value="Reminders">Reminders</option>
        </select></div>{mappedMoos} 
        <button onClick={()=>nav('/create')}>create</button>
        </div>
    )
}