import { useNavigate, Link} from "react-router-dom";
import { logOut } from "../../services/apiConfig";
import logo from "../../files/logo.png"
import { useState } from "react";

import './Header.css'


export default function Header({profile, setProfile }){

    const user = profile === null ? false : true
    const nav = useNavigate()
    const [createToggle, setCreateToggle] = useState(false)

    const handleLogout = async () => {
        
            const res = await logOut()
            if (res){
                setCreateToggle(false)
                setProfile(null)
                nav('/signin')
            }
            
        }
    const goToCreate = function(){
        setCreateToggle(true)
        nav('/create')
    }

    const leaveCreate = function(){
        setCreateToggle(false)
        nav('/mymamoos')
    }

    return(
        <div>
            {
                user === true ?  
                <header>
                    <div onClick={()=>{nav('/mymamoos')}} id="logo-holder"><img alt='mamoo' id="logo" src={logo}/></div>
                    <div className="under-header">
                    <button onClick={()=>nav(`/mymamoos`)}id="username">{profile.username}</button>
                    {
                        createToggle === false ? <button onClick={goToCreate}>Create a Mamoo</button> :  <button onClick={leaveCreate}>Back</button>
                    }              
                   
                    <Link to='/signin' ><button  onClick={handleLogout}>Log Out</button></Link>
                    
                    </div>
                </header> 
                : 
                <header>

                    <div id="logo-holder"><img id="logo" alt="mamoo" src={logo}/></div>
                </header>
            }
        </div>
    )
}