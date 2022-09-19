import { Layout } from "../../Tools/Layout/Layout"
import { HomeList } from "./HomeList"


export const Home = () => {
    return (
        <>
            <Layout title="Forside" description="opgave">

                <HomeList />

            </Layout>
        </>
    )
}