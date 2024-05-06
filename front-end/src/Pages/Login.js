import React, { useContext, useState } from 'react'
import './Login.css'
import user_icon from '../components/Assets/person.png'
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
import NBar from '../components/NBar'
import api from '../api/axios';
import { useAuth
 } from '../context/context'
import { useNavigate } from 'react-router-dom'


const LOGIN_URL = '/auth/signin';

export const Login = () => {
    const { user,setUser,token,setToken} = useAuth();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('')
    const navigate = useNavigate();

    async function handleLogin (){
        if(!username || !password){
            setError('username and password are required')
            return;
        }else{
            setError('')
        }
        try {
            const response = await api.post(LOGIN_URL ,JSON.stringify({
                username,
                password,
            }),{
                headers:{
                    'Content-Type':'application/json',
            },
                withCredentials:true,
                
            })

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setToken(response.data.token)
            setUser(response.data.user)
            navigate('/',{replace:true});
        } catch (error) {
            if(error.request.status === 400){
                setError(error.response.data.error)
            }
        }
    }

    return (
        <div className='background'>
            <div className='container'>
                <NBar />
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    <span className="font-medium">{error}</span>
                </div> }

                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} value={username} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <div className="submit-container">
                    <div className={"submit"} onClick={handleLogin}>Login</div>
                </div>
            </div>
            </div>
    )
}
