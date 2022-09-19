import style from '../../assets/Style/Header.module.scss'
import { HighLight } from '../Pages/Home/HighLight'
import { BurgerMenu, Navigation } from '../Partials/Nav'
import { Search } from './Search'


export const Header = () => {
    return (
        <>
            <Search />
            <Navigation />
            <BurgerMenu />
            <HighLight />
        </>

    )
}