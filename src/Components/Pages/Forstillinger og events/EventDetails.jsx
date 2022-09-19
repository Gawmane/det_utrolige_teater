import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Styling
import { Layout } from "../../Tools/Layout/Layout";
// import style from "../../../assets/Style/Houses.module.scss"

// Function Component til details
export const EventDetails = () => {
    const { data_id } = useParams(0);
    //Får objekt ud {} - fordi [] arrey kommer kun ud ved lister
    const [data, setData] = useState({});

    // Hook til styring af renders
    useEffect(() => {
        //Async funktion til kald af api med axios
        const getDetailsData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${data_id}`);
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
        [data_id])

    return (
        // Kalder layout komponent med description
        <Layout description="detaljer">

            {/* //Tjekker data og returner vores indhold hvis det er der, ellers null */}
            {data && data ? (
                <>
                    <h1>{data.title}</h1>
                </>

            ) : null}


        </Layout>
    )
}

