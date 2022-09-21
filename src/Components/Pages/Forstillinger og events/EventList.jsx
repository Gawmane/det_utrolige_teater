import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HighLight } from '../Home/HighLight'
import Moment from 'moment'

//Styling
import style from "../../../assets/Style/List.module.scss"

import { Layout } from "../../Tools/Layout/Layout"

// Function Component til lister
export const EventList = () => {
    const [data, setData] = useState([]);
    const { event_id } = useParams(0);

    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events');
                setData(result.data.items);
                //Hvis fejl vis i console
            } catch (error) {
                console.log(error)
            }
        }
        //Funktionskald 
        getData();
        // Dependency array - hvis det ændres renderes komponenten
    }, [setData]);

    //Konvatering af datoer - viser dag måned (Skrevet ec. November) og år

    //Return af vores inhold
    return (
        <>
            <HighLight />
            {/* //Styring af title og beskrivelse via vores layout (seo) */}

            <section className={style.eventlist}>
                <Layout title="Oversigt" description="Oversigt over de forestillinger der er">
                    {/* //Mapper data */}
                    {data && data.map((items) => {
                        //Konvatering af datoer - viser dag måned (Skrevet ec. November) og år
                        const Startdate = Moment(items.startdate).format("DD-MMMM");
                        const Stopdate = Moment(items.stopdate).format("DD-MMMM YYYY");

                        return (
                            <figure key={items.id}>
                                <img src={items.image_small} alt={items.title} />
                                <figcaption>
                                    <article>
                                        <h3>{items.title}</h3>
                                        <span>

                                            <p>{items.stage_name}</p>
                                            <p>{Startdate} - {Stopdate}</p>

                                        </span>
                                        <button className={style.btnreadmore}><Link to={`${items.id}`}  >Læs mere</Link></button>
                                        <button className={style.btnbuy}><Link to={`/bestilling`} >Køb billet</Link></button>
                                    </article>
                                </figcaption>
                            </figure>

                        )
                    }

                    )}
                </Layout>
            </section>
        </>
    )
}