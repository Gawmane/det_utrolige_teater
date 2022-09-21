//Importede dependency
import { NavLink } from "react-router-dom"
import { useState } from "react";

import { useAuth } from "../Tools/Appservice/Auth"
import { Login } from '../Pages/Login/Login';
//Styling og icons
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import style from '../../assets/Style/Nav.module.scss'


export const Navigation = () => {
    //Custum hook useAuth - henter vores getter og vores login side
    const { loginData } = useAuth(Login);

    return (

        <nav className={style.navigation}>
            <ul className={style.ulwrapper}>
                <li><NavLink to={'/'}>Forside</NavLink></li>
                <li><NavLink to={'/events'}>Forstillinger og events</NavLink></li>
                <li><NavLink to={'/actors'}>Skuespillere</NavLink></li>
                {/* //Hvis vi er logget ind vis "login" i nav ellers vis "logud" */}
                <li><NavLink to={'/login'}>{loginData.access_token ? "Min side" : "Login"}</NavLink></li>

            </ul>

        </nav>


    )
}

export function BurgerMenu() {

    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <>
            <div className={isActive ? style.burgerMenuActive : style.burgerMenu} onClick={handleToggle}>
                <AiFillHome className={style.burgerMenuHome} />
                <AiOutlineClose className={style.burgerMenuClose} />
            </div>

            <ul className={isActive ? style.activeMenu : style.menu}>
                <li><NavLink className={style.navigationLinks} to="/" onClick={handleToggle}>Forside</NavLink></li>
                <li><NavLink className={style.navigationLinks} to="/events" onClick={handleToggle}>Forstillinger og events</NavLink></li>
                <li><NavLink className={style.navigationLinks} to="/actors" onClick={handleToggle}>Skuespillere</NavLink></li>
                <li><NavLink className={style.navigationLinks} to="/login" onClick={handleToggle}>Login</NavLink></li>
            </ul>
        </>
    )
}
