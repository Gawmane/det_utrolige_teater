import style from '../../assets/Style/Header.module.scss'
import { HighLight } from '../Pages/Home/HighLight'
import { BurgerMenu, Navigation } from '../Partials/Nav'
import { Search } from './Search'
import logo_svg from "../../assets/Images/Icon_Logo.svg"


export const Header = () => {
    return (
        <header className={style.header}>
            <div>
                <img src={logo_svg} alt="logo det utrolige teater" />
                <span>
                    <Search />
                    <Navigation />

                </span>
            </div>
            <BurgerMenu />
            <HighLight />
        </header>

    )
}