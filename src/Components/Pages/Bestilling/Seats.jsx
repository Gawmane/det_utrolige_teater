import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../../Tools/Appservice/Auth";
//Styling
// import style from "../../../assets/Style/pr.module.scss"


// Function Component til lister
export const Checkbox = () => {
    const [data, setData] = useState([]);
    const { event_id } = useParams(0);
    // const { loginData } = useAuth


    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats`);
                setData(result.data.items);
                //Hvis fejl vis i console
            } catch (error) {
                console.log(error)
            }
        }
        //Funktionskald 
        getData();
        // Dependency array - hvis det ændres renderes komponenten
    }, [event_id]);



    //Return af vores inhold
    return (


        <>
            {/* //Mapper data */}
            {data && data.map((items) => {

                return (

                    <section className={style.checkmarks}>

                        <input type="checkbox" {...items.id}>

                        </input>


                    </section>


                )
            }

            )}



        </>
    )
}