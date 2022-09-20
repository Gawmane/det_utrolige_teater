import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { authHeader } from "../../Tools/Appservice/AuthHeader";
import { Link } from "react-router-dom";

//Funktion til oprettelse af reviews
export const NewReviews = () => {
    //UseState hook - false 
    const [formStatus, setFormStatus] = useState(false);
    //Form Hook til handelsubmit
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Funktion til at kalde api med form data
    const onSubmit = async (data) => {
        const formData = new FormData();
        //Tilføjer title,content,user_id,num_starts og active til objektet
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);
        formData.append('event_id', data.event_id);
        formData.append('num_stars', data.num_stars);
        //Bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.post('https://api.mediehuset.net/detutroligeteater/reviews', formData, { headers: authHeader() });

        //Fejlhåndtering i console
        if (result) {
            console.log('Din kommentar er sendt');

        } else {
            console.log(errors);
        }
        //Setter setFormStatus til true for at kunne submit vores form
        setFormStatus(true)
    }
    return (
        <section>

            {/* Conditional ternary operator - vis input - efter tryk submit vis message */}
            {!formStatus ?

                // handleSubmit validere  inputs inden kald af "onSubmit" 
                <form onSubmit={handleSubmit(onSubmit)}>

                    <span>
                        {/* Validering TITLE - tjekker om title er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}

                        <input type="text" id="subject" {...register("subject", { required: true, maxLength: 20 })} placeholder="Emne" />
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.subject && errors.subject.type === "required" && <span>Du skal indtaste en title</span>}
                        {errors.subject && errors.subject.type === "maxLength" && <span>Din title må ikke være længere end 20 karakter</span>}

                    </span>

                    <span>
                        {/* Validering MESSAGE - tjekker om message er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator) */}
                        <label>Anmeldelse:</label>
                        <textarea id="comment"{...register("comment", { required: true })} placeholder="Kommentar"></textarea>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.comment && errors.comment.type === "required" && <span>Du skal indtaste en besked</span>}

                    </span>

                    <span>
                        {/* Validering MESSAGE - tjekker om message er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator) */}
                        <label>Antal stjerner:</label>
                        <input type="number" id="num_stars"{...register("num_stars", { required: true })} ></input>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.num_stars && errors.num_stars.type === "required" && <span>Du skal vælge antal stjerner</span>}
                    </span>

                    <button type="submit" >Send</button>


                </form>
                :
                // Ny form med besked om at formen er sendt og link til min side
                <form>
                    <article>
                        <h2>Tak for din anmeldelse</h2>
                        <p>Din anmedelse er nu offenlig og alle kan se den</p>
                        <p>Du kan se dine anmeldelser her: <Link to={'/login'}>din side</Link></p>


                    </article>
                </form>
            }
        </section>

    )
}
