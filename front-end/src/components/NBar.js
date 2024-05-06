import { MenuData } from './MenuData';
import "./NBarStyles.css"
import { Link } from "react-router-dom";
import { useAuth } from '../context/context';

export const  NBar = ()=>{

    const {user} = useAuth();

        return (
            <nav className='NavbarItems'>
                <Link to='/' className='logoA'>
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
                    {user  ?    <li key={98}>
                                <Link to='/logout' className='nav-links-mobile'>
                                logout
                            </Link>
                            </li> :   <li key={99}>
                                <Link to='/login' className='nav-links-mobile'>
                                login
                            </Link>
                            </li>}
                </ul>
            </nav>
        );
    }

export default NBar;