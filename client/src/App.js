
import './App.css';
import { useState, useEffect } from "react";
import {Routes, Route, } from 'react-router-dom'
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import { verifyUser } from './services/apiConfig';
import UserHome from './components/UserHome/UserHome';
import Create from './components/Create/Create';
import MamooDetail from './components/MamooDetail/MamooDetail';
import Header from './components/Header/Header';

function App() {

const [profile, setProfile] = useState({})
const [toggle, setToggle] = useState(false)


  useEffect(() => {
    const fetchUser = async () => {
      const res = await verifyUser();
      res ? setProfile(res) : setProfile(null)

    };
    fetchUser();
  }, []);





  return (
    <div className="App">
      <Header profile={profile} setProfile={setProfile}/>
      <Routes>
        <Route path='/' element={<Home setProfile={setProfile} profile={profile} setToggle={setToggle}/>}/>
        <Route path='/signin' element={<SignIn setProfile={setProfile} profile={profile} setToggle={setToggle}/>}/>
        <Route path='/:id' element={<UserHome profile={profile}  setToggle={setToggle}/>}/>
        <Route path='/create' element={<Create profile={profile} setToggle={setToggle} toggle={toggle}/>}/>
        <Route path='/mamoo/:id' element={<MamooDetail profile={profile} />}/>
      </Routes>
    </div>
  );
}

export default App;
