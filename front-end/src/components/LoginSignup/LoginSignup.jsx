import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import NBar from '../NBar'

export const LoginSignup = () => {

    const [action, setAction] = useState("Login");

    return (
        <div className='background'>
            <div className='container'>
                <NBar />
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">

                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' />
                    </div>
                    {action === "Login" ? <div></div> : <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Confirm Password' />
                    </div>}

                </div>
                {action === "hide" ? <div className="forgot-password">Lost Password ? <span>Click Here!</span></div> : <div></div>}
                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                </div>
            </div>
            </div>
    )
}
