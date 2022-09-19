//Importede dependency
import { Routes, Route } from 'react-router-dom'

//Pages der skal vises via router
import { NotFound } from '../../Pages/NotFound/NotFound'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'
import { EventList } from '../../Pages/Forstillinger og events/EventList'
import { EventDetails } from '../../Pages/Forstillinger og events/EventDetails'


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
            {/* ROUTER PLACEHOLDER TIL LISTE MED DETALJE VISNING */}
            <Route path='/events'>
                <Route index element={<EventList />} ></Route>
                <Route path=":data_id" element={<EventDetails />}></Route>
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )

}