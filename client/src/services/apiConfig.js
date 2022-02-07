import axios  from "axios";
import jwtDecode from "jwt-decode";



const getToken = () => {
  return new Promise(resolve => {
      resolve(`Bearer ${localStorage.getItem('access') || null}`)
  })
}


const api = axios.create({
  baseURL:
    "https://mamoo-db.herokuapp.com/"
});

api.interceptors.request.use(
    async function (config) {
        if (localStorage.getItem('access')){
            config.headers['Authorization'] = await getToken()
        }   
        return config
    }, function (error) {
    console.log('Request error: ', error)
    return Promise.reject(error)
});

export const logIn = async (credentials) => {
    try {
      const res = await api.post("/login/", credentials);

      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      const decode = jwtDecode(res.data.access)
      if (decode){
          const res = await api.get(`customuser/${decode.user_id}`)
          return res.data
      }
    } catch (error) {
      throw error;
    }
  };

export const logOut = async () => {
  try {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const refresh = localStorage.getItem("refresh");

  if (refresh) {
    const res = await api.post("/refresh-token/", { refresh });
    localStorage.setItem("token", res.data.access);
    const decode = jwtDecode(res.data.access)
      if (decode){
          const res = await api.get(`customuser/${decode.user_id}`)
          return res.data
      }
  }
  return false;
};

export const deleteMamoo = async (id)=>{
    const res = await api.delete(`/mamoo/${id}`)
    if (res){
        return res
    }
}

export const getMamoos = async ()=>{
    const res = await api.get(`/mamoo/`)
    return res.data
};


export const getMyMamoos = async (pk)=>{
    const res = await api.get(`/mymamoos/`)
    return res.data
};


export const getMamoo = async(id)=>{

    try {

        const res = await api.get(`/mamoo/${id}`)

        return res.data
    
    } catch(error) {

        throw error
    }
}

export const createMamoo = async(mam) =>{
    try{
        const res = await api.post(`/mamoo/`, mam )
        return res.data
    } catch(error){
        throw error 
    }
};

export const signUp = async (credentials) => {

        try {
            
          const res = await api.post(`/customuser/`, credentials)
          if (res){
            const res = await logIn(credentials)
            return res
          }
    
        } catch (error) {

          throw error
        }  
        
    }

