import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Styling
import { Layout } from "../../Tools/Layout/Layout";

// Function Component til details
export const ActorsDetails = () => {
    const { actor_id } = useParams(0);
    //Får objekt ud {} - fordi [] arrey kommer kun ud ved lister
    const [data, setData] = useState({});

    // Hook til styring af renders
    useEffect(() => {
        //Async funktion til kald af api med axios
        const getDetailsData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/actors/${actor_id}`);
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
        // Dependency array - hvis actor_id  ændres renderes komponenten
        [actor_id])

    return (
        // Kalder layout komponent med description
        <Layout title="Skuespillere" description="detaljer">

            {/* //Tjekker data og returner vores indhold hvis det er der, ellers null */}
            {data && data ? (
                <figure key={data.id}>
                    <img src={data.image} alt={data.name} />
                    <figcaption>
                        <article>
                            <h4>{data.name}</h4>
                            <p>{data.description}</p>
                        </article>
                    </figcaption>
                </figure>

            ) : null}


        </Layout>
    )
}
