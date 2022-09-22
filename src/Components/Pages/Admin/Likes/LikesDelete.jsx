import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Tools/Appservice/Auth";
import { authHeader } from "../../../Tools/Appservice/AuthHeader";
import axios from "axios";
import style from "../../../../assets/Style/Login.module.scss"

//Styling
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
//NPM -  react-confirm-alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


//Liste der skal vises på vores side - liste kun med egen kommentar (admin)
export const AdminPanelLikes = () => {
    const { loginData } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAdmin = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/favorites`);
                if (result.data) {
                    setData(result.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAdmin();
    }, [])

    //Const til at slette comment via id
    const deleteLikes = async (id) => {
        try {
            //Bruger authHeader til at tjekke om sessionStorage eksisterer
            const result = await axios.delete(`https://api.mediehuset.net/detutroligeteater/favorites/${id}`, { headers: authHeader() });
            if (result) {
                submit()
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Submit function til Alert ved slet - NPM react-confirm-alert
    const submit = () => {
        confirmAlert({
            title: 'Bekræft dit valg',
            message: 'Er du sikker på du vil slette?',
            buttons: [
                {
                    label: 'Ja',
                    onClick: () => window.location.reload()
                },
                {
                    label: 'Nej',
                }

            ]
        });
    }
    return (
        <>
            {/*Conditional ternary operator
              bruger kommantar skal kun vises ved login*/}
            {!loginData ?
                (
                    <></>
                )
                :
                (
                    <table>
                        <thead>
                            <tr>
                                <th>Forestilling</th>

                                <th>Rediger </th>


                            </tr>
                        </thead>
                        <tbody>
                            {data.filter(user => user.user_id == loginData.user_id).map(getUser => {

                                return (
                                    <tr key={getUser.id}>
                                        <td>{getUser.title}, {getUser.stage_name}</td>

                                        <td> <Link to={getUser.id} className={style.edit}><AiFillEdit /></Link>
                                            <button onClick={() => deleteLikes(getUser.id)} className={style.delete}><AiOutlineCloseCircle /></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}

        </>
    )
}