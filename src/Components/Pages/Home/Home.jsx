import { Layout } from "../../Tools/Layout/Layout"
import { HighLight } from "./HighLight"
import { HomeList } from "./HomeList"


export const Home = () => {
    return (
        <>
            <Layout title="Home page" description="opgave">
                <HighLight />
                <HomeList />
            </Layout>
        </>
    )
}