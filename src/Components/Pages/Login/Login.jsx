//Importede dependency
import { useForm } from "react-hook-form";
import { useAuth } from "../../Tools/Appservice/Auth";
import axios from "axios";
import { useState } from "react"

//Styling
import style from "../../../assets/Style/Login.module.scss"
import { Layout } from "../../Tools/Layout/Layout";
import { AiOutlineStar, AiFillHeart } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";

import { AdminPanelReviews } from "../Admin/Reviews/ReviewDelete";
import { AdminPanelLikes } from "../Admin/Likes/LikesDelete";

// Function Component til login
export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    //Henter data fra useAuth
    const { loginData, setLoginData } = useAuth();
    const [message, setMessage] = useState('');


    // Funktion til at kalde api med form data
    const sendLogin = async data => {
        const formData = new FormData();
        //Tilføjer username og password til objektet 
        formData.append("username", data.username);
        formData.append("password", data.password);
        //Poster endpoint med formdata
        try {
            const result = await axios.post('https://api.mediehuset.net/token', formData)
            handleSessionData(result.data);
        }
        //Hvis der er fejl i login send fejlbesked 
        catch (err) {
            setMessage('Kunne ikke logge ind - tjek dit brugernavn og password')
        }
    }
    //Funktion til at håndtere form data
    const handleSessionData = data => {
        if (data) {
            sessionStorage.setItem("token", JSON.stringify(data));
            setLoginData(data)
        }
    }

    //Logout funktion - fjerne token og efterlader en tom string
    const logOut = () => {
        sessionStorage.removeItem('token')
        setLoginData('')
    }
    return (
        <section className={style.loginwrapper}>


            {/* Vis hvis form er falsk */}
            {!loginData && !loginData.username ? (
                <Layout title="Login" description="Login side" >
                    {/* // Sætter onSubmit event med closure function
                    //closure = sender funktion videre som tager en funktion som argument og så lukker - sendlogin lukker handelSubmit*/}
                    <form onSubmit={handleSubmit(sendLogin)} className={style.loginform}>

                        {/* //Spread operator(...) - giver mulighed for at kopiere hele eller dele af et eksisterende array eller objekt til et andet array eller objekt. */}
                        <label htmlFor="username">Brugernavn: </label>
                        <input type="text" placeholder="Brugernavn" id="username" {...register("username", { required: true })} />
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.username && errors.username.type === "required" && <span>Du skal indtaste dit brugernavn</span>}


                        <label htmlFor="password">Adgangskode: </label>
                        <input type="password" placeholder="Adgangskode" id="password" {...register("password", { required: true })} />
                        {/* Fejlmeddelse der skifter mellem hvilken type der skal sendes. ex pattern */}
                        {errors.password && errors.password.type === "required" && <span>Du skal indtaste dit password</span>}

                        <p>{message}</p>
                        <button>send</button>
                    </form>
                </Layout>
            ) : (
                //Hvis bruger er logget ind - vis logindata
                <>
                    <span className={style.flex}>
                        <Layout title="Min side" description="admin side" ></Layout>
                        <span>
                            <p>Du er logget ind som {loginData.username}</p>
                            {/* //Knap der kalder vores logout funktion og logger af */}
                            <button onClick={logOut} >Logout</button>
                        </span>
                    </span>
                    {/* Pleaceholder til eventuel admin panel*/}
                    <h3><FaTicketAlt /> Mine reservatoner</h3>
                    <h3><AiFillHeart /> Mine favoritter</h3>
                    <h3><AiOutlineStar /> Mine anmeldelser</h3>
                    <AdminPanelReviews />
                    {/* Ikke sat op endnu */}
                    {/* <AdminPanelLikes />
                    <AdminPanelReviews /> */}

                </>)}
        </section>

    );
}