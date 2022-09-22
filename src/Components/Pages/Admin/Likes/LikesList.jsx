import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Tools/Appservice/Auth";
//Styling
import style from "../../../../assets/Style/Login.module.scss"
import { Layout } from "../../../Tools/Layout/Layout"


// Function Component til lister
export const LikesList = () => {
    const [data, setData] = useState([]);



    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/reservations`);
                setData(result.data.items);
                //Hvis fejl vis i console
            } catch (error) {
                console.log(error)
            }
        }
        //Funktionskald 
        getData();
        // Dependency array - hvis det ændres renderes komponenten
    }, []);



    //Return af vores inhold
    return (
        //Styring af title og beskrivelse via vores layout (seo)
        <Layout title="Reservation" description="beskrivelse">
            <>
                {/* //Mapper data */}
                {data && data.map((items) => {
                    return (

                        <></>
                    )
                })}





            </>
        </Layout>
    )
}