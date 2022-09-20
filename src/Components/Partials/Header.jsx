import style from '../../assets/Style/Header.module.scss'
import { BurgerMenu, Navigation } from './Nav'
import { Search } from './Search'
import logo_svg from "../../assets/Images/Icon_Logo.svg"


export const Header = () => {
    return (
        <header className={style.header}>

            <img src={logo_svg} alt="logo det utrolige teater" />

            <Search />
            <Navigation />
            <BurgerMenu />

        </header>

    )
}