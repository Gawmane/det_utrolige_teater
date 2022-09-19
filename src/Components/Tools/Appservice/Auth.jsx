//Importede dependency
import { useContext } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react"

const AuthContex = createContext();

// {children} shortcut for props.children
const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useState('');

    // Opdater loginData med data fra sessionstorage hvis det findes
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            //Gør til javascript objekt 
            setLoginData(JSON.parse(sessionStorage.getItem('token')))
        }
    }, [children])
    return (
        //Sender vores logindata med i componentet -  Alle childs af denne får adgang til logindata 
        //provider = metode fra usecontex
        <AuthContex.Provider value={{ loginData, setLoginData }}>
            {children}
        </AuthContex.Provider>
    )
}
//custom hook - useContext er en måde at styre dine tilstande (states) globalt.- bruges til at transpotere tilstandsværider igennem componter
const useAuth = () => useContext(AuthContex);
//Named export 
export { AuthProvider, AuthContex, useAuth }

//Placere authprovider i index hvor den pakker app ind så den kan tilgåes hele projektet
