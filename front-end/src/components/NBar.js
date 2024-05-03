import { Component } from 'react';
import { MenuData } from './MenuData';
import "./NBarStyles.css"

class NBar extends Component {
    render() {
        return (
            <nav className='NavbarItems'>
                <a href='/home' className='logoA'>
                    <h1 className='logo'>
                         <i className="fa-solid fa-shield-halved"></i>
                         <span className='logoText'>Hunter</span>
                    </h1>
                </a>

                <ul className='nav-menu'>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}><a href={item.url} className={item.cName}>
                                <i className={item.icon}></i>{item.title}
                            </a></li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default NBar;