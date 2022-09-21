//Importede dependency
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//Style og icons
import style from '../../assets/Style/Search.module.scss'
import { AiOutlineSearch } from "react-icons/ai";


//Funtion component
const Search = () => {
    const [keyword, setKeyword] = useState('')
    const { register, handleSubmit } = useForm();

    //Sætter data.keyword hvis getSearchResult har data
    const getSearchResult = data => {
        setKeyword(data.keyword);
    }
    return (
        <>
            {/* //closure = sender funktion videre som tager en funktion som argument og så lukker */}
            <form onSubmit={handleSubmit(getSearchResult)} className={style.searchform}>
                {/* //Spread operator(...) - giver mulighed for at kopiere hele eller dele af et eksisterende array eller objekt til et andet array eller objekt. */}
                <input id="keyword" type="text" placeholder="Indtast søgeord" {...register("keyword", { required: true })} />
                <button > <AiOutlineSearch /></button>
            </form>
            {/* Henter SearchResult og sætter det data ind på vores side */}
            {keyword && (
                <SearchResult keyword={keyword} />
            )}

        </>)
}

//Viser hvilket søgeresulat der er kommet på ordet - result eller noResult
const SearchResult = props => {
    const [searchData, setSearchData] = useState([]);

    //UseEffect hook - laver en sync const der laver en axios get af endpoint med keyword parameter
    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/search/${props.keyword}`);
            setSearchData(result.data)
        }
        getData()

        //Render keyword og setsearchdata hvis de ændre sig
    }, [props.keyword, setSearchData]);

    return (
        <>
            {/* //Ser efter om der er nogle count(antal data i søgningen) - hvis der er; vis result. Hvis ikke; vis noresult */}
            {searchData.count ?
                // Viser hvor mange resultater(count), der er på ordet (keyword) og viser data (items) - hentes fra result
                <Result count={searchData.count} items={searchData.items} keyword={props.keyword} />
                :
                //Viser fejlbesked fra noResult med ordet i beskeden (keyword)
                <NoResult keyword={props.keyword} />}
        </>
    )
}


//Viser en liste med data hvis orden findes
const Result = (props) => {
    //Funktion til at slette vores liste af data på viste søgord når vi klikker videre
    const RemoveSearchResult = () => {
        if (keyword) {
            setKeyword()
        }
    };
    return (
        <article className={style.searchlist}>
            <h3>Fandt {props.count} resultater på ordet <i>{props.keyword}</i></h3>


            {props.items && props.items.map(item => {
                return (
                    //Linker til detajle siden med det id der passer sammen og kalder removesearchresult der fjerner listen
                    <Link to={`/events/${item.id}`} onClick={RemoveSearchResult} key={item.id} >
                        {item.title}
                    </Link>

                )
            })}
        </article >)
}

//Vises hvis keyword ikke findes - fejlmeddelese
const NoResult = (props) => {
    return (
        <>
            <p>Fand ingen resultater på din søgning <i>"{props.keyword}"</i></p>
            <p>Tjek om dit ord er stavet rigtigt, eller prøv igen med et mere specifikt ord</p>
        </>
    )
}
export { Search, SearchResult }

