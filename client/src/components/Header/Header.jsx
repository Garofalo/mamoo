import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/apiConfig";

export default function Header({profile, setProfile}){

    const user = profile === null ? false : true
    const nav = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
            const res = await logOut()
            if (res){
                console.log(res)
                setProfile(null)
                nav('/')
            }
            console.log(res)
        }



    return(
        <div>
            {
                user === true ?  
                <header>{profile.username}
                    <button className="nav-button" onClick={handleLogout}>Log Out</button>
                </header> 
                : 
                <header>
                    <button className="nav-button" onClick={()=>nav('/signin')}>Sign In</button>
                    <button className="nav-button" onClick={()=>nav('/signup')}>Sign Up</button>
                </header>
            }
        </div>
    )
}