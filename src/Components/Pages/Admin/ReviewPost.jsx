import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { authHeader } from "../../Tools/Appservice/AuthHeader";
import { Link } from "react-router-dom";
import style from "../../../assets/Style/Login.module.scss"
import { AiFillStar } from "react-icons/ai";

const colors = {
    yellow: "#D39D5B",
    grey: "#a9a9a9"

}

//Funktion til oprettelse af reviews
export const PostReviews = (props) => {
    //UseState hook - false 
    const [formStatus, setFormStatus] = useState(false);
    //Form Hook til handelsubmit
    const { register, handleSubmit, formState: { errors } } = useForm()


    //Funktion til at kalde api med form data
    const onSubmit = async (data) => {
        const formData = new FormData();
        //Tilføjer title,content,user_id,num_starts og active til objektet
        formData.append('subject', data.subject);
        formData.append('comment', data.comment);
        formData.append('event_id', props.event_id);
        formData.append('num_stars', data.num_stars);
        formData.append('active', 1);
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
    //Const med array på 5 så der vises 5 stjerner (5 objekter)
    const stars = Array(5).fill()
    //Tom usestate til at slette ikke gemt data
    const [rating, setRating] = useState(null);

    return (
        <section className={style.postreview}>

            {/* Conditional ternary operator - vis input - efter tryk submit vis message */}
            {!formStatus ?

                // handleSubmit validere  inputs inden kald af "onSubmit" 
                <form onSubmit={handleSubmit(onSubmit)}>

                    <span>
                        <label >Antal stjerner:
                            {/* Mapper vores stars (array) */}
                            {stars.map((_, index) => {
                                //Sætter array til 1 istedet for 0 - kan ikke sættes direkte ind som ved listen da værdien bliver 0
                                const ratingValue = index + 1
                                return (
                                    <>
                                        {/* Validering NUM_STARS - tjekker om message er udfyldt (required) og hvor langt dens værdi er, og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)
                                        Ved klik på en button skal den tage setRating og give den en værdi
                                        */}
                                        <input key={index} type="radio" onClick={() => setRating(ratingValue)} value={ratingValue}
                                            {...register("num_stars", { required: true, min: 1, max: 5 })} ></input>
                                        {/* Måler på hvilken værdi der er blevet valgt og sætter farve på stjernerne efter det 
                                            gul = Hvis værien er større end index vis gul
                                            grå = hvis ikke value er større vis grå
                                            */}
                                        <AiFillStar color={(rating || ratingValue) > index ? colors.yellow : colors.grey} />

                                    </>
                                )
                            })}
                        </label>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.num_stars && errors.num_stars.type === "required" && <span>Du skal vælge antal stjerner</span>}
                    </span>


                    <span>
                        {/* Validering SJUBJECT - tjekker om title er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}

                        <input type="text" id="subject" {...register("subject", { required: true, maxLength: 20 })} placeholder="Emne" />
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.subject && errors.subject.type === "required" && <span>Du skal indtaste en title</span>}
                        {errors.subject && errors.subject.type === "maxLength" && <span>Din title må ikke være længere end 20 karakter</span>}

                    </span>

                    <span>
                        {/* Validering COMMENT - tjekker om message er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator) */}

                        <textarea id="comment"{...register("comment", { required: true })} placeholder="Kommentar"></textarea>
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.comment && errors.comment.type === "required" && <span>Du skal indtaste en besked</span>}

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
