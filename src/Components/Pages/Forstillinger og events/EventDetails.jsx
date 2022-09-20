import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//Styling
import { Layout } from "../../Tools/Layout/Layout";
import { ReviewsList } from "../Admin/List";
import { NewReviews } from "../Admin/Post";
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
                <section key={data.id}>
                    <figure key={data.id}>
                        <p>{data.stage_name}</p>
                        <p>{data.startdate} - {data.stopdate}</p>
                        <p>Billetpris: {data.price} DKK</p>
                        <img src={data.image} alt={data.title} />
                        <figcaption>
                            <article>
                                <h2>{data.title}</h2>
                                <h3>{data.genre}</h3>
                                <button><Link to={`/${data.id}`} >Køb billet</Link></button>
                                <p>{data.description}</p>
                            </article>
                            <article>
                                <h3>Medvirkende</h3>

                                {/* <ActorsListDetails /> */}

                            </article>
                        </figcaption>
                    </figure>
                    <ReviewsList />
                    <NewReviews />
                </section>

            ) : null}


        </Layout>
    )
}

// export const ActorsListDetails = () => {
//     const { data_id } = useParams(0);
//     //Får objekt ud {} - fordi [] arrey kommer kun ud ved lister
//     const [data, setData] = useState({});



//     // Hook til styring af renders
//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${data_id}`);
//                 if (result.data) {
//                     setData(result.data.item.actors);
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         // Funktionskald
//         getData()
//     },
//         // Dependency array - hvis data_id  ændres renderes komponenten
//         [data_id])

//     return (
//         <>
//             {data && data.map((actors) => {
//                 return (
//                     <figure>
//                         <img src={actors.image} alt={actors.name} />
//                         <figcaption>
//                             <p>{actors.name}</p>
//                         </figcaption>
//                     </figure>
//                 )
//             })}
//         </>

//     )
// }

