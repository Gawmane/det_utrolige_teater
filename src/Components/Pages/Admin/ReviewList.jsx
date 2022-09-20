import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//Styling
// import style from "../../../assets/Style/pr.module.scss"
import { Layout } from "../../Tools/Layout/Layout"

// Function Component til lister
export const ReviewsList = () => {
    const [data, setData] = useState([]);
    const { data_id } = useParams(0);

    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/reviews?event_id=6');
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
        <Layout title="Liste af anmedelser" description="beskrivelse">
            <>
                {/* //Mapper data */}
                {data && data.map((items) => {

                    return (
                        <article key={items.id} >
                            <p>{items.num_stars}</p>
                            <p>{items.created}</p>
                            <p>{items.subject}</p>
                            <p>{items.comment}</p>
                            <p>{items.user.firstname} {items.user.lastname}</p>
                            <p></p>
                        </article>


                    )
                }

                )}
            </></Layout>
    )
}