import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react"; import { authHeader } from "../../Tools/Appservice/AuthHeader";
import { AiOutlineStar } from "react-icons/ai";



//Funktion til opdatering af reviews
export const EditReviews = () => {
    //Useparms hook til styring af id
    const { review_id } = useParams();
    //Form Hook
    const { register, handleSubmit, formState: { errors } } = useForm();
    //UseState hook - false
    const [formStatus, setFormStatus] = useState(false);

    //Funktion til at kalde api med form data
    const onSubmit = async (data) => {
        //Tilføjer id,title,content,num_starts og active til objektet
        const formData = new URLSearchParams();
        formData.append('id', review_id);
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);
        formData.append('num_stars', data.num_stars);
        // Bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.put('https://api.mediehuset.net/detutroligeteater/reviews', formData, { headers: authHeader() });
        //Fejlhåndtering i console
        if (result) {
            console.log('Din kommentar er opdateret');

        } else {
            console.log(errors);
        }
        //Setter setFormStatus til true for at kunne submit vores form
        setFormStatus(true)
    }
    return (
        <section >

            {/* Conditional ternary operator - vis input - efter tryk submit vis message */}
            {!formStatus ?

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Skriv en anmeldelse</h5>
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
                        <input type="number" id="num_stars"{...register("num_stars", { required: true })} ><AiOutlineStar /></input>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.num_stars && errors.num_stars.type === "required" && <span>Du skal vælge antal stjerner</span>}
                    </span>

                    <button type="submit" >Send</button>
                    <Link to={'/login'}>Gå tilbage til alle kommentar</Link>
                </form>
                :
                // Ny del med besked om at kommentaren er opdateret og link til min side
                <>
                    <p>Din kommentar er opdateret!</p>
                    <Link to={'/login'}>Gå tilbage til alle kommentar</Link>
                </>
            }
        </section>

    )
}