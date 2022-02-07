
import { useEffect, useState } from "react";
import { createMamoo } from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";
import "./Create.css"

export default function Create({profile}){

    const nav = useNavigate()
    const [mam, setMam] = useState({
        title: "",
        type: "",
        where: "",
        what: "",
        user: profile.pk,
        when: parseInt((Date.now())/(1000*60*60*24)-29)
      });
     

const handleChange = (e) => {
        const { name, value } = e.target;
        setMam({
          ...mam,
          [name]: value,
        });
      };
const [validate, setValidate] = useState("")

const handleSubmit = async (e) => {
        e.preventDefault();
        setValidate("")
      if(mam.title === "" || mam.type === "") {
        setValidate("validate")
      } else {setMam({
            ...mam,
          });
        if (mam.where === ""){
          setMam({
            ...mam,
            where: "You decided to leave this blank"
          })
        }
        if (mam.what === ""){
          setMam({
            ...mam,
            what: "You decided to leave this blank"
          })
        }
        const res = await createMamoo(mam);
        if(res){
    
            nav(`/${profile.pk}`);
        }}
        
      };


    return(
    <form  onSubmit={handleSubmit}>
      <div >

        <h1>Mamoorialize</h1>
        <div className="box">
          <select name="type" value={mam.type} onChange={handleChange}>
            <option>What Kind of Mamoo?</option>
            <option value="Good Times">Good Times</option>
            <option value="Tough Times">Tough Times</option>
            <option value="Milestone">Milestone</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>
      </div>
      <div id="mam-card-container">
        
        
          <input
            className="mam-card-item space-me"
            id="right-title"
            placeholder="Enter a Title"
            value={mam.title}
            name="title"
            onChange={handleChange}
          />

          <input
            className="mam-card-item space-me"
            id="right-style"
            placeholder="Describe where you are"
            value={mam.where}
            name="where"
            onChange={handleChange}
              />

            <textarea
            className="mam-card-item space-me"
            placeholder="Use up to 1024 character to describe what's happening, and how you're feeling."
            id="what"
            rows="4"
            cols="25"
            value={mam.what}
            name="what"
            onChange={handleChange}
              />
              <p id={validate}>Remember, you only need a title and a type, write as much or as little as you want.</p>
              
          

    
        
        
      </div>
      <div id="mam-card-submit">
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      
    </form>
    )
}