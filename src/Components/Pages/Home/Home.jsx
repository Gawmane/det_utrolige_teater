import { Layout } from "../../Tools/Layout/Layout"
import { HighLight } from "./HighLight"
import { HomeList } from "./HomeList"


export const Home = () => {
    return (
        <>
            <HighLight />
            <Layout title="Forside" description="opgave">

                <HomeList />

            </Layout>
        </>
    )
}