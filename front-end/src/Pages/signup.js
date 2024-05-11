import React, { useState } from 'react'
import user_icon from '../components/Assets/person.png'
import email_icon from '../components/Assets/email.png'
import password_icon from '../components/Assets/password.png'
import NBar from '../components/NBar'
import { useAuth } from '../context/context'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'


const SIGNUP_URL = '/auth/signup';

export const Signup = () => {
    const { user,setUser,token,setToken} = useAuth();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors,setErrors] = useState([])

    const navigate = useNavigate();

    async function handleSignup (){
        if(!username || !password || !confirmPassword){
            setErrors(['all fields are required'])
            return;
        }else{
            setErrors([])
        }
        try {
            const response = await api.post(SIGNUP_URL ,JSON.stringify({
                username,
                password,
                confirm_password:confirmPassword,
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
                setErrors(Object.values(error.response.data.errors))
            }
        }
    }

    return (
        <>
                <NBar />
        <div className='background'>
            <div className='form-container'>
                <div className="header">
                    <div className="text">Signup</div>
                    <div className="underline"></div>
                </div>

                {errors.length > 0 && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    <ul className='list-disc'>
                        {errors.map((error)=>{
                            return (<li>{error}</li>)
                        })}
                    </ul>
                </div> }

                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" id="username" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} value={username} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" id="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" id="confirmPassword" placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>
                </div>
                <div className="submit-container">
                    <div className={"submit"} onClick={handleSignup}>Signup</div>
                </div>
            </div>
            </div>
                        </>
    )
}
