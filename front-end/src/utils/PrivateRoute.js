import { useEffect } from "react";
import { useAuth } from "../context/context";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


export default function PrivateRoute({children}){
    const {user,setUser} = useAuth();
    const navigate = useNavigate();
    const TOKEN_VALIDATION_URL = '/auth/token';

    useEffect(()=>{
        (async function (){
            try {
                const response = await api.get(TOKEN_VALIDATION_URL ,{
                    headers:{
                        'Content-Type':'application/json',
                },
                    withCredentials:true,
                })

                if(response.status === 200){
                    setUser(response.data.user)
                    localStorage.setItem('user', JSON.stringify(response.data.user));   
                }
            } catch (error) {
                navigate('/login',{replace:true});
            }
        })()
    },[])

    useEffect(()=>{
        if(user === null){
            navigate('/login',{replace:true});
        }
    },[navigate,user])

    if(user){
        return children;
    }else{
        navigate('/login',{replace:true});
    }
}