import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HighLight } from '../Home/HighLight'
//Styling
import style from "../../../assets/Style/List.module.scss"

import { Layout } from "../../Tools/Layout/Layout"

// Function Component til lister
export const EventList = () => {
    const [data, setData] = useState([]);
    const { data_id } = useParams(0);

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

    //Return af vores inhold
    return (
        <>
            <HighLight />
            {/* //Styring af title og beskrivelse via vores layout (seo) */}
            <Layout title="Oversigt" description="Oversigt over de forestillinger der er">
                <section className={style.eventlist}>
                    {/* //Mapper data */}
                    {data && data.map((items) => {

                        return (
                            <figure key={items.id}>
                                <img src={items.image} alt={items.title} />
                                <figcaption>
                                    <article>
                                        <h4>{items.title}</h4>
                                        <span>
                                            <p>{items.startdate} - {items.stopdate}</p>
                                            <p>{items.stage_name}</p>
                                        </span>
                                        <button><Link to={`${items.id}`} >Læs mere</Link></button>
                                        <button><Link to={`/bestilling`} >Køb billet</Link></button>
                                    </article>
                                </figcaption>
                            </figure>

                        )
                    }

                    )}
                </section>
            </Layout>
        </>
    )
}