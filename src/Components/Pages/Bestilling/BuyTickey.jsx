import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../Tools/Layout/Layout"
import Moment from "moment";
import { FormPost } from "./Form";


export const BuyTicket = () => {
    const { id } = useParams();
    const { event_id } = useParams();
    const [data, setData] = useState({});

    // Hook til styring af renders

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`);
                if (result.data) {
                    setData(result.data.item);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [event_id])
    //Konvatering af datoer - viser dag måned (Skrevet ec. November) og år
    //Laves som funktion her da vi ikke mapper
    const StartDate = () => {
        const startdate = Moment(data.startdate).format("DD.MMMM YYYY")
        return startdate
    }
    return (
        <section>


            {data && data ? (

                <figure>
                    <img src={data.image_medium} alt={data.id} />
                    <figcaption>
                        <Layout title='Køb billet' description='Køb billet' />

                        <h3>{data.title}</h3>
                        <h3>{StartDate()} KL. {data.starttime}</h3>

                        <h4 >BILLETPRIS: {data.price} DKK</h4>
                        <p>PRIS INKL. MOMS</p>
                    </figcaption>
                </figure>
            ) : null}

            <FormPost event_id={data.id} />
        </section>
    )
}