import style from "../../../assets/Style/Form.module.scss"

import { authHeader } from "../../Tools/Appservice/AuthHeader";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

//Form const der indeholder alt funktionelt til kontakt formen
export const FormPost = (props) => {
    const { ticket_id } = useParams();

    const { register, formState: { errors }, handleSubmit } = useForm();

    //Ved clik onsubmit - vis info i console og gør setformstatus true 
    const onSubmit = async (data) => {
        const formData = new FormData();
        //Tilføjer eventid, navn, adresse til objektet
        formData.append('event_id', props.event_id);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('address', data.address);
        formData.append('zipcode', data.zipcode);
        formData.append('city', data.city);


        //Bruger authHeader til at tjekke om sessionStorage eksisterer
        const result = await axios.post('https://api.mediehuset.net/detutroligeteater/reservations', formData, { headers: authHeader() });

        //Fejlhåndtering i console
        if (result) {
            console.log('Din Reservation er sendt');

        } else {
            console.log(errors);
        }
    }
    return (

        // handleSubmit validere  inputs inden kald af "onSubmit"
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>


            {/* Validering NAVN - tjekker om fullname er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}
            <label htmlFor="text">Fornavn</label>
            <input type="text" {...register("firstname", { required: true, pattern: /^[A-Za-z]+$/i, maxLength: 20 })} placeholder="Fornavn" />
            {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
            {errors.firstname && errors.firstname.type === "required" && <span>Du skal indtaste dit navn</span>}
            {errors.firstname && errors.firstname.type === "pattern" && <span>Dit navn må ikke indholde tal</span>}
            {errors.firstname && errors.firstname.type === "maxLength" && <span>Dit navn må ikke være længere end 20 karakter</span>}


            {/* Validering EFTERNAVN - tjekker om lastname er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}
            <label htmlFor="text">Efternavn</label>
            <input type="text" {...register("lastname", { required: true, pattern: /^[A-Za-z]+$/i })} placeholder="Efternavn" />
            {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
            {errors.lastname && errors.lastname.type === "required" && <span>Du skal indtaste dit efternavn</span>}
            {errors.lastname && errors.lastname.type === "pattern" && <span>Dit efternavn må ikke indholde tal</span>}



            {/* Validering VEJ/GADE OG HUSNUMMER - tjekker om address er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}
            <label htmlFor="text">Vejnavn & nr</label>
            <input type="text" {...register("address", { required: true })} placeholder="Gade/vej og husnummer" />
            {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
            {errors.address && errors.address.type === "required" && <span>Du skal indtaste din adresse</span>}

            {/* Validering POSTNUMMER - tjekker om zipcode er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}
            <label htmlFor="text">Postnummer & by</label>
            <input type="number" {...register("zipcode", { required: true })} placeholder="Postnr." />
            {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
            {errors.zipcode && errors.zipcode.type === "required" && <span>Du skal indtaste dit postnummer</span>}
            {/* {errors.zipcode && errors.zipcode.type === "min" && <span>Dit postnummer skal være 4 karakter lang</span>}
            {errors.zipcode && errors.zipcode.type === "max" && <span>Dit postnummer skal Må ikke være længere end 4 karakter</span>} */}


            {/* Validering BY - tjekker om city er udfyldt (required) og sender en fejl meddelese hvis der ikke er skrevet noget i feltet (... = Spread operator)*/}
            <input type="text" {...register("city", { required: true, pattern: /^[A-Za-z]+$/i })} placeholder="By" />
            {errors.city && errors.city.type === "required" && <span>Du skal indtaste dit bynavn</span>}
            {errors.city && errors.city.type === "pattern" && <span>Navnet på byen må kun indholde bogstaver</span>}


            <button type="Godkend bestilling" >Send</button>


        </form>


    )
}



