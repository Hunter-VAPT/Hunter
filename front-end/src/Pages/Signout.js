import React from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/context';

export default function Logout(){
    const navigate = useNavigate();
    const {setUser,setToken} = useAuth();

    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}