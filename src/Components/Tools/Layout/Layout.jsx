//Importede dependency
import { useEffect } from "react"

const Layout = props => {


    useEffect(() => {

        //Dokument title
        document.title = props.title
        //Hvis der er en description - find metatag "description" i dom og indsæt ny værdi 
        if (props.description) {
            document.querySelector('meta[name="description"]')
                .setAttribute("content", props.description)
        }
        //Hvis props ændres - render siden
    }, [props.title, props.description])

    return (
        <>
            <h1 className="layoutTitle">{props.title}</h1>
            {props.subtitle && (
                <h2 className="layoutSubtitle">{props.subtitle}</h2>
            )}
            {/* Nedaver børn - indhold indeni compment- */}
            <ContentWrapper>{props.children}</ContentWrapper>
        </>
    )
}
//Function component - props chrilden er alt indhold der er inden i <layout/> i componten
const ContentWrapper = props => {
    return (
        <section className="layoutContainer">
            {props.children}
        </section>
    )
}

export { Layout, ContentWrapper }