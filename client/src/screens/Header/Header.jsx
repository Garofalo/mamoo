import { useNavigate, useParams } from "react-router-dom";
import { logOut } from "../../services/apiConfig";
import logo from "../../files/logo.png"
import m from '../../files/m.png'
import './Header.css'
import { useState
 } from "react";


export default function Header({profile, setProfile}){

    const user = profile === null ? false : true
    const nav = useNavigate()
    const [createToggle, setCreateToggle] = useState(true)

    const handleLogout = async (e) => {
        e.preventDefault()
            const res = await logOut()
            if (res){
                console.log(res)
                setProfile(null)
                nav('/signin')
            }
            
        }
    
    const whichToGo = createToggle === true ? "create" : `mymamoos`
    const whichButton = createToggle === true ? "Make a Mamoo" : "Back to Home"


    const decideButton = function(){
        setCreateToggle(e=>!e)
        nav(`/${whichToGo}`)
    }

    return(
        <div>
            {
                user === true ?  
                <header>
                    <div id="logo-holder"><img id="logo" src={logo}/></div>
                <div className="under-header">
                <button onClick={()=>nav(`/${profile.pk}`)}id="username">{profile.username}</button>
                <button onClick={decideButton}>{whichButton}</button>
                {/* <button onClick={console.log(create)}>{whichButton}</button> */}
                    <button  onClick={handleLogout}>Log Out</button>
                    
                    </div>
                </header> 
                : 
                <header>

                    <div id="logo-holder"><img id="logo" src={logo}/></div>
                </header>
            }
        </div>
    )
}