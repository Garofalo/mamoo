import { useNavigate, Link} from "react-router-dom";
import { logOut } from "../../services/apiConfig";
import logo from "../../files/logo.png"
import { useState } from "react";

import './Header.css'

const initialState = {
    showMenu: "hide",
    downUp: "up"
}

export default function Header({profile, setProfile }){

    const user = profile === null ? false : true
    const nav = useNavigate()
    const [createToggle, setCreateToggle] = useState(false)

    const [{ showMenu, downUp },setState] = useState(initialState)
    const clearState = () => {setState({ ...initialState });}

    const handleLogout = async () => {
        
        setCreateToggle(false)
        setProfile(null)
            const res = await logOut()
            if (res){
                
                
                setTimeout(() => {
                    clearState();
                }, 1000)
            }
        nav('/signin')
            
        }
    const goToCreate = function(){
        setCreateToggle(true)
        nav('/create')
        setTimeout(() => {
            clearState();
          }, 1000)
    }

    const leaveCreate = function(){
        setCreateToggle(false)
        nav('/mymamoos')
        setTimeout(() => {
            clearState();
          }, 1000)
    }
    const goToHome = function(){
        setCreateToggle(false)
        nav('/mymamoos')
        setTimeout(() => {
            clearState();
          }, 1000)
    }
    const goToAbout = function(){
        setCreateToggle(false)
        nav('/about')
        setTimeout(() => {
            clearState();
          }, 1000)
    }

    const toggleUpDown = function(){
        
        if (downUp === "down") {

                clearState();

        } else if(downUp ==="up"){
            setState({
                showMenu: "show",
                downUp: "down"
            })
        }

    }


    return(
        <div className="head-holder">
           {
                user === true ?  
                <header>
                    
                        <div className="menu">
                            <button className={`menu-button ${downUp}`} onClick={toggleUpDown}/>
                   
                            <div className={`${showMenu} dropdown`}>
                            <button className="display-nav" onClick={goToHome}id="username">Home ></button>
                            <button className="display-nav" onClick={goToCreate}>Make a Mamoo ></button> 
                            <button className="display-nav" onClick={goToAbout}>About ></button>
                            <button  className="display-nav" onClick={handleLogout}>Log Out ></button>
                            
                            </div>
               
                        </div>
                    
                    <div>{
                        createToggle === false ? <button className='left-header' onClick={goToCreate}>Make a Mamoo ></button> :  <button className='back-left-header' onClick={leaveCreate}>{`< Back`}</button>
                    }</div>
                </header>
                 : 
                 <header>
 
                     <div id="logo-holder"><img id="logo" alt="mamoo" src={logo}/></div>
                 </header>
            }
        </div>
    )
}