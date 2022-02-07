
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
            where: "Location Omitted"
          })
        }
        if (mam.what === ""){
          setMam({
            ...mam,
            what: "Description Omitted"
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
        <div className="box" id="type-selector">
          <select name="type" value={mam.type} onChange={handleChange}>
            <option>What Kind of Mamoo?</option>
            <option value="Good Times">Good Times</option>
            <option value="Tough Times">Tough Times</option>
            <option value="Milestone">Milestone</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>
      </div>
      <div id="create-inputs">
        <div>
          <input
            placeholder="Enter a Title"
            value={mam.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="Describe Where you are"
            value={mam.where}
            name="where"
            onChange={handleChange}
              />
        </div>
        <div>
            <textarea
            placeholder="Use up to 1024 character to describe what's happening"
            id="what"
            rows="4"
            cols="25"
            value={mam.what}
            name="what"
            onChange={handleChange}
              />
        </div>
            <p id={validate}>Remember, you only need a title and a type, write as much or as little as you want.</p>

      </div>
      <div id="mam-card-submit">
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      
    </form>
    )
}