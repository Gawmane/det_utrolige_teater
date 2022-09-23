import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from 'moment'

//Styling
import { Layout } from "../../Tools/Layout/Layout";
import style from "../../../assets/Style/List.module.scss"

import { ReviewsList } from "../Admin/Reviews/ReviewList";

// Function Component til details
export const EventDetails = () => {
    const { event_id } = useParams(0);
    //Får objekt ud {} - fordi [] arrey kommer kun ud ved lister
    const [data, setData] = useState({});

    // Hook til styring af renders
    useEffect(() => {
        //Async funktion til kald af api med axios
        const getDetailsData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`);
                setData(result.data.item);

            }
            //Hvis fejl vis i console
            catch (error) {
                console.log(error)
            }
        }
        // Funktionskald
        getDetailsData()
    },
        // Dependency array - hvis data_id  ændres renderes komponenten
        [event_id])

    //Konvatering af datoer - viser dag måned (Skrevet ec. November) og år
    //Laves som funktion her da vi ikke mapper
    const StartDate = () => {
        const startdate = Moment(data.startdate).format("D.MMMM YYYY")
        return startdate
    }
    const StopDate = () => {
        const stopdate = Moment(data.stopdate).format("DD MMMM YYYY")
        return stopdate
    }
    return (
        // Kalder layout komponent med description
        <Layout description="detaljer">

            {/* //Tjekker data og returner vores indhold hvis det er der, ellers null */}
            {data && data ? (

                <section key={data.id} className={style.eventdetails}>
                    <figure >
                        <img src={data.image} alt={data.title} />
                        <figcaption>
                            <article><p><b>{data.stage_name}</b></p>
                                <span>


                                    <p>{StartDate()} - {StopDate()}</p>
                                    <p>Billetpris: {data.price} DKK</p>
                                </span>
                                <h3>{data.title}</h3>
                                <h4>{data.genre}</h4>
                                <button><Link to={`${data.id}`} >Køb billet</Link></button>
                                <p>{data.description}</p>
                                <h4>Medvirkende</h4>
                            </article>
                            <article className={style.showactors}>


                                {data.actors && data.actors.map(item => {
                                    return (
                                        <Link to={`/actors/${item.id}`} key={item.id}>
                                            <figure>
                                                <img src={item.image} alt={item.name} />
                                                <figcaption>
                                                    <p>{item.name}</p>

                                                </figcaption>
                                            </figure>
                                        </Link>
                                    )
                                })}

                            </article>
                        </figcaption>
                    </figure>
                    <ReviewsList />

                </section>

            ) : null}


        </Layout>
    )
}

export const ActorsListDetails = () => {
    const { event_id } = useParams(0);
    //Får objekt ud {} - fordi [] arrey kommer kun ud ved lister
    const [data, setData] = useState({});



    // Hook til styring af renders
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`);
                if (result.data) {
                    setData(result.data.item.actors);
                }
            } catch (error) {
                console.log(error)
            }
        }
        // Funktionskald
        getData()
    },
        // Dependency array - hvis data_id  ændres renderes komponenten
        [event_id])

    return (
        <>
            {data && data ? (

                <figure>
                    <img src={data.image} alt={data.name} />
                    <figcaption>
                        <p>{data.name}</p>
                        <p>hej</p>
                    </figcaption>
                </figure>
            ) : null}

        </>

    )
}
