import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Tools/Appservice/Auth";
import Moment from 'moment'
//Styling
import style from "../../../assets/Style/Login.module.scss"
import { Layout } from "../../Tools/Layout/Layout"
import { PostReviews } from "./Post";
import { Login } from "../Login/Login";
import { AiOutlineStar } from "react-icons/ai";
import { BsCardText } from "react-icons/bs";
// Function Component til lister
export const ReviewsList = () => {
    const [data, setData] = useState([]);
    const { event_id } = useParams(0);
    const { loginData } = useAuth(Login)


    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/reviews?event_id=${event_id}`);
                setData(result.data.items);
                //Hvis fejl vis i console
            } catch (error) {
                console.log(error)
            }
        }
        //Funktionskald 
        getData();
        // Dependency array - hvis det ændres renderes komponenten
    }, [event_id]);



    //Return af vores inhold
    return (
        //Styring af title og beskrivelse via vores layout (seo)
        <Layout title="Anmedelser" description="beskrivelse">
            <>
                {/* //Mapper data */}
                {data && data.map((items) => {
                    const date = Moment(items.created).format("DD.MM.YYYY");
                    return (
                        <article key={items.id} >
                            <p>{items.num_stars} <AiOutlineStar /> </p>
                            <p>{date}</p>
                            <p>{items.subject}</p>
                            <p>{items.comment}</p>
                            <p>{items.user.firstname} {items.user.lastname}</p>
                            <p></p>

                        </article>


                    )
                })}
                <section className={style.reviewwrapper}>
                    <h3><BsCardText /> Skriv en anmedelse</h3>
                    {!loginData.access_token ? (
                        <>

                            <p>Du skal være logget ind for at skrive en anmedelse</p>
                            <div className={style.loginevent}><Login /></div>
                        </>
                    ) :
                        (
                            <>
                                <PostReviews event_id={event_id} />
                            </>
                        )}
                </section>


            </>
        </Layout>
    )
}