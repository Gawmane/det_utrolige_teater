import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
//Styling
import style from "../../../assets/Style/List.module.scss"

import { Layout } from "../../Tools/Layout/Layout"

// Function Component til lister
export const ActorsList = () => {
    const [data, setData] = useState([]);
    const { actor_id } = useParams(0);

    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/actors');
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
        //Styring af title og beskrivelse via vores layout (seo)
        <Layout title="Skuespillere" description="Side med liste over skuespillere">
            <section className={style.actorlist}>
                {/* //Mapper data */}
                {data && data.map((items) => {

                    return (
                        <figure key={items.id}>
                            <img src={items.image} alt={items.name} />
                            <figcaption>
                                <article>
                                    <h4>{items.name}</h4>
                                    <p>{items.description}</p>
                                    <button><Link to={`${items.id}`} >Læs mere</Link></button>
                                </article>
                            </figcaption>
                        </figure>

                    )
                }

                )}
            </section></Layout>
    )
}