//Importede dependency
import { Routes, Route } from 'react-router-dom'

//Pages der skal vises via router
import { NotFound } from '../../Pages/NotFound/NotFound'
import { Home } from '../../Pages/Home/Home'
import { Login } from '../../Pages/Login/Login'
import { EventList } from '../../Pages/Forstillinger og events/EventList'
import { EventDetails } from '../../Pages/Forstillinger og events/EventDetails'
import { EditReviews } from '../../Pages/Admin/Reviews/ReviewPut'
import { ActorsList } from '../../Pages/Skuespillere/ActorsList'
import { ActorsDetails } from '../../Pages/Skuespillere/ActorsDetails'
import { BuyTicket } from '../../Pages/Bestilling/BuyTickey'


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />

            <Route path='/actors'>
                <Route index element={<ActorsList />} ></Route>
                <Route path=":actor_id" element={<ActorsDetails />}></Route>
            </Route>

            {/* ROUTER PLACEHOLDER TIL LISTE MED DETALJE VISNING */}
            <Route path='/events'>
                <Route index element={<EventList />} ></Route>
                <Route path=":event_id" element={<EventDetails />}></Route>
            </Route>

            <Route path="/login">
                <Route index element={<Login />}></Route>
                <Route path=":review_id" element={<EditReviews />} />

            </Route>
            <Route path="/bestilling">
                <Route path=':event_id' element={<BuyTicket />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )

}