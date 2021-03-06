
import './App.css';
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom'
import SignUp from './screens/SignUp/SignUp';
import SignIn from './screens/SignIn/SignIn';
import { verifyUser } from './services/apiConfig';
import UserHome from './screens/UserHome/UserHome';
import Create from './screens/Create/Create';
import MamooDetail from './screens/MamooDetail/MamooDetail';
import AllMamoos from './screens/AllMamoos/AllMamoos';
import About from './screens/About/About';
import Layout from './screens/Layout/Layout';

function App() {


const [profile, setProfile] = useState(null)

const nav = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await verifyUser();
      res ? setProfile(res) : setProfile(null) && nav('/')
    };
    fetchUser();
    
  },[]);

  let today = parseInt((Date.now())/(1000*60*60*24))




  return (
    <div className="App">
      
      <Layout profile={profile} setProfile={setProfile}>
      
      <Routes>
        
        <Route path='/' element={<UserHome setProfile={setProfile} profile={profile} />}/>
        <Route path='/signin' element={<SignIn setProfile={setProfile} profile={profile}  />}/>
        {/* <Route path='/:id' element={<UserHome profile={profile}  setProfile={setProfile} today={today}/>}/> */}
        <Route path='/create' element={<Create profile={profile} setProfile={setProfile} />}/>
        <Route path='/mymamoos/:id' element={<MamooDetail profile={profile} today={today} setProfile={setProfile} />}/>
        <Route path='/signup' element={<SignUp setProfile={setProfile} profile={profile}  />}/>
        <Route path='/mymamoos/' element={<AllMamoos profile={profile} today={today} />}/>
        <Route path='about'  element={<About profile={profile} today={today} />}/>
      </Routes>
      </Layout>
    </div>
  );
}

export default App;
