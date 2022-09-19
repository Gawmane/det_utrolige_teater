import { Layout } from "../../Tools/Layout/Layout"
import { HomeList } from "./HomeList"

export const Home = () => {
    return (
        <>
            <Layout title="Home page" description="opgave">
                <HomeList />
            </Layout>
        </>
    )
}