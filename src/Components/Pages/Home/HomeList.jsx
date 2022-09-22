import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'

import style from "../../../assets/Style/List.module.scss"
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
        <section className={style.homelist}>
            {data && data.map((items) => {
                //Konvatering af datoer - viser dag (D= ingen 0 foran DD=0foran) måned (Skrevet ec. November) og år
                const Startdate = Moment(items.startdate).format("D.MMMM");
                const Stopdate = Moment(items.stopdate).format("DD.MMMM YYYY");
                return (
                    <figure key={items.id}>
                        <img src={items.image} alt={items.title} />
                        <figcaption>
                            <article>
                                <p>{items.stage_name}</p>
                                <p><b>{Startdate} - {Stopdate}</b></p>
                                <hr />
                                <h3>{items.title}</h3>
                                <p>{items.genre}</p>
                            </article>
                            <button className={style.btnreadmore}><Link to={`/events/${items.id}`} >Læs mere</Link></button>
                            <button className={style.btnbuy}><Link to={`/bestilling/${items.id}`} >Køb billet</Link></button>
                        </figcaption>
                    </figure>

                )
            })}
            <button className={style.viewbtn}> <Link to={'/events'}>Se alle forestillinger</Link></button>
        </section>
    );
}
