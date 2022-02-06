
import { useEffect, useState } from "react";
import { createMamoo } from "../../services/apiConfig";
import { useNavigate } from "react-router-dom";


export default function Create({profile}){

    const nav = useNavigate()
    const [mam, setMam] = useState({
        title: "",
        type: "",
        where: "",
        what: "",
        user: profile.pk,
        when: parseInt((Date.now())/(1000*60*60*24))
      });
     

const handleChange = (e) => {
        const { name, value } = e.target;
        setMam({
          ...mam,
          [name]: value,
        });
      };


const handleSubmit = async (e) => {
        e.preventDefault();
        setMam({
            ...mam,
          });
        const res = await createMamoo(mam);
        if(res){
    
            nav(`/${profile.pk}`);
        }
        
      };


    return(
        <form  onSubmit={handleSubmit}>
      <div >

        <label > < br/> </label>
        <select
          className="left-container-item"
          name="type"
          value={mam.type}
          id="type-selector"
          onChange={handleChange}
        >
          <option>What Kind of Mamoo?</option>
          <option value="Good Times">Good Times</option>
          <option value="Tough Times">Tough Times</option>
          <option value="Milestone">Milestone</option>
          <option value="Reminder">Reminder</option>
        </select>
      </div>
      <div id="mam-card-container">
        <h2 className="required-text">All fields are required.</h2>
        <div id="top-mam-card">
          <input
            className="mam-card-item space-me"
            id="right-title"
            placeholder="Enter Title"
            value={mam.title}
            name="title"
            onChange={handleChange}
          />
          </div>
        <div id="bottom-mam-card">
          <div className="mam-id-top-form">
          <div className='bottom-right-input'>
          <h3>Where:</h3>
          <input
            className="mam-card-item space-me"
            id="right-style"
            value={mam.where}
            name="where"
            onChange={handleChange}
              />
            </div>
            < br/>
            <div className='bottom-right-input-des'>
          <h3>What:</h3>
            <input
            className="mam-card-item space-me"
            id="what"
            value={mam.what}
            name="what"
            onChange={handleChange}
              />
              </div>
          </div>

    
        
        </div>
      </div>
      <div id="mam-card-submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </form>
    )
}