import axios  from "axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";



const getToken = () => {
  return new Promise(resolve => {
      resolve(`Bearer ${localStorage.getItem('access') || null}`)
  })
}


const api = axios.create({
  baseURL:
    "http://localhost:8000"
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
      const decode = jwtDecode(res.data.access)
      if (decode){
          const res = await api.get(`customuser/${decode.user_id}`)
          return res
      }
    } catch (error) {
      throw error;
    }
  };

export const logOut = async () => {
  try {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return true;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    const res = await api.post("/refresh-token/", { refresh });
    localStorage.setItem("access", res.data.access);
    return res;
  }
  return false;
};

export const getMamoos = async ()=>{
    const res = await api.get(`/mamoo/`)
    return res.data
};

export const createMamoo = async(mam) =>{
    try{
        const res = await api.post(`/mamoo/`, mam )
        return res.data
    } catch(error){
        throw error 
    }
};