import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
//Styling
// import style from "../../../assets/Style/pr.module.scss"
import { Layout } from "../../Tools/Layout/Layout"

// Function Component til lister
export const List = () => {
    const [data, setData] = useState([]);
    const { data_id } = useParams(0);

    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getData = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/');
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
        <Layout title="Title" description="beskrivelse">
            <>
                {/* //Mapper data */}
                {data && data.map((items) => {

                    return (
                        <figure key={items.id} >
                            //Link til id
                            <Link to={`${items.id}`} >

                                <figcaption>
                                </figcaption>
                            </Link>
                        </figure>

                    )
                }

                )}
            </></Layout>
    )
}