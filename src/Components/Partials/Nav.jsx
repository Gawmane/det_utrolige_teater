//Importede dependency
import { NavLink } from "react-router-dom"
import { useState } from "react";

//Styling og icons
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import style from '../../assets/Style/Nav.module.scss'

export const Navigation = () => {
    return (
        <nav className={style.navigation}>
            <ul className={style.ulwrapper}>
                <li><NavLink to={'/'}>Forside</NavLink></li>
                <li><NavLink to={'/events'}>Forstillinger og events</NavLink></li>
                <li><NavLink to={'/actors'}>Skuespillere</NavLink></li>
                <li><NavLink to={'/login'}>Login</NavLink></li>
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
