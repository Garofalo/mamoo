import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/apiConfig";
import logo from "../../files/logo.png"
import m from '../../files/m.png'
import './Header.css'
export default function Header({profile, setProfile}){

    const user = profile === null ? false : true
    const nav = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
            const res = await logOut()
            if (res){
                console.log(res)
                setProfile(null)
                nav('/signin')
            }
            
        }



    return(
        <div>
            {
                user === true ?  
                <header>
                    <div id="logo-holder"><img id="logo" src={logo}/></div>
                <div className="under-header">
                <h1 id="username">{profile.username}</h1>
                    <button className="nav-button" onClick={handleLogout}>Log Out</button>
                    </div>
                </header> 
                : 
                <header>
                    {/* <button className="nav-button" onClick={()=>nav('/signin')}>Sign In</button>
                    <button className="nav-button" onClick={()=>nav('/signup')}>Sign Up</button> */}
                    <div id="logo-holder"><img id="logo" src={logo}/></div>
                </header>
            }
        </div>
    )
}