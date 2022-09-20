import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../../assets/Style/List.module.scss"

export const HighLight = () => {
    const [data, setData] = useState([]);


    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events?limit=1');
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
    return (
        <section className={style.highlight}>
            {data && data.map((items) => {
                return (
                    <figure key={items.id}>

                        <figcaption>
                            <article>
                                <p>{items.stage_name}</p>
                                <p>{items.startdate} - {items.stopdate}</p>
                                <hr />
                                <h3>{items.title}</h3>
                                <p>{items.genre}</p>
                            </article>
                        </figcaption>
                        <img src={items.image_medium} alt={items.title} />
                    </figure>

                )
            })}
        </section>
    );
}
