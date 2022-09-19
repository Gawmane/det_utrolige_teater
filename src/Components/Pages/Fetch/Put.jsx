import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react"; import { authHeader } from "../../Tools/Appservice/AuthHeader";


//Funktion til opdatering af reviews
export const EditReviews = () => {
    //Useparms hook til styring af id
    const { comment_id } = useParams();
    //Form Hook
    const { register, handleSubmit, formState: { errors } } = useForm();
    //UseState hook - false
    const [formStatus, setFormStatus] = useState(false);

    //Funktion til at kalde api med form data
    const onSubmit = async (data) => {
        //Tilføjer id,title,content,num_starts og active til objektet
        const formData = new URLSearchParams();
        formData.append('id', comment_id);
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('num_stars', data.num_stars);
        formData.append('active', 1);
        // Bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.put('https://api.mediehuset.net/', formData, { headers: authHeader() });
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
                        <label>Title:</label>
                        <input type="text" id="title" {...register("title", { required: true, maxLength: 20 })} />
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.title && errors.title.type === "required" && <span>Du skal indtaste en title</span>}
                        {errors.title && errors.title.type === "maxLength" && <span>Din title må ikke være længere end 20 karakter</span>}

                    </span>

                    <span>
                        {/* Validering MESSAGE - tjekker om message er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator) */}
                        <label>Anmeldelse:</label>
                        <textarea id="content"{...register("content", { required: true })} ></textarea>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.content && errors.content.type === "required" && <span>Du skal indtaste en besked</span>}

                    </span>

                    <span>
                        {/* Validering MESSAGE - tjekker om message er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator) */}
                        <label>Antal stjerner:</label>
                        <input type="number" id="num_stars"{...register("num_stars", { required: true })} ></input>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.num_stars && errors.num_stars.type === "required" && <span>Du skal vælge antal stjerner</span>}
                    </span>

                    <button type="submit" >Send</button>
                    <button type='reset'>Nulstil</button>
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