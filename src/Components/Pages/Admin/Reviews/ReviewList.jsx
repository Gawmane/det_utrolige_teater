import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Tools/Appservice/Auth";
import Moment from 'moment'
//Styling
import style from "../../../../assets/Style/Login.module.scss"
import { Layout } from "../../../Tools/Layout/Layout"
import { PostReviews } from "./ReviewPost";
import { Login } from "../../Login/Login";
import { AiFillStar } from "react-icons/ai";
import { BsCardText } from "react-icons/bs";

const colors = {
    yellow: "#D39D5B",
    grey: "#a9a9a9"

}

// Function Component til lister
export const ReviewsList = () => {
    const [data, setData] = useState([]);
    const { event_id } = useParams(0);
    const { loginData } = useAuth(Login)
    const [ratingValue, setRatingValue] = useState(undefined)


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
                    // Const til konvatering af dato til dato(01) Måned(maj) år (2000)
                    const date = Moment(items.created).format("DD.MM.YYYY");
                    //Const med vores data(number) fra apiet så vi kan sætte det ind i vores stars.map
                    const numStars = (items.num_stars)
                    //Const med array på 5 så der vises 5 stjerner (5 objekter)
                    const stars = Array(5).fill(0)
                    return (
                        <article key={items.id} >
                            {stars.map((_, index) => {
                                return (
                                    // Laver vores stjerner og måler på om der er data - ratingValue skal være grå da det er de tomme og numStars skal have gul omkring det antal som den har af værdi
                                    <AiFillStar size={24} key={index}
                                        color={(ratingValue || numStars) > index ? colors.yellow : colors.grey}

                                    />
                                )
                            })}
                            <p>{date}</p>
                            {/* Til tjek om der er data i numstars
                            <p>{numStars}</p> 
                            */}
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