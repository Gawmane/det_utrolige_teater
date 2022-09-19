//Importede dependency
import { Routes, Route } from 'react-router-dom'

//Pages der skal vises via router
import { NotFound } from '../../Pages/NotFound/NotFound'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/login">
                <Route index element={<Login />}></Route>
                {/* Placeholder til comment 
                <Route path=":comment_id" element={<EditReviews />} />
           */}
            </Route>
            {/* ROUTER PLACEHOLDER TIL LISTE MED DETALJE VISNING
            <Route path='/produkt'>
                <Route index element={<List />} ></Route>
                <Route path=":data_id" element={<Details />}></Route>
            </Route> 
            */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )

}