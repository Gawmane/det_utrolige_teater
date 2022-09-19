import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; import axios from "axios";

export const HomeList = () => {
    const [data, setData] = useState([]);


    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events?limit=3');
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
        <>
            {data && data.map((items) => {
                return (
                    <figure key={items.id}>
                        <img src={items.image} alt={items.title} />
                        <figcaption>
                            <article>
                                <h4>{items.title}</h4>
                                <p>{items.startdate} - {items.stopdate}</p>
                                <p>{items.stage_name}</p>
                                <p>{items.genre}</p>
                                <button><Link to={`/boliger/${items.id}`} >Læs mere</Link></button>
                                <button><Link to={`/boliger/${items.id}`} >Køb billet</Link></button>
                            </article>
                        </figcaption>
                    </figure>

                )
            })}
        </>
    );
}
