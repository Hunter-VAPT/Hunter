import { Component } from 'react';
import { MenuData } from './MenuData';
import "./NBarStyles.css"
import { Link } from "react-router-dom";

class NBar extends Component {
    render() {
        return (
            <nav className='NavbarItems'>
                <Link to='/home' className='logoA'>
                    <h1 className='logo'>
                         <i className="fa-solid fa-shield-halved"></i>
                         <span className='logoText'>Hunter</span>
                    </h1>
                </Link>

                <ul className='nav-menu'>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>
                                
                                <Link to={item.url} className={item.cName}>
                                <i className={item.icon}></i>{item.title}
                            </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default NBar;