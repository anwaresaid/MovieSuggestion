import react,{useState} from "react";
import { useEffect } from "react";
import {API_key, base_url, categories, allCats} from "./const.jsx"; 
import Card from "./Card";
import DropDown from "../common/dropDown"

let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;

const Main=(props)=>{
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState('');
    const [genresId, setGenresId]=useState(35);
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    const getData=(movieType)=>{
        if(movieType=="Recommended")
        {
            url=base_url+`/discover/movie?with_genres=${props.user.categoriesFav.join(',')}&sort_by=popularity.desc`+API_key;
        }
        else if(movieType=="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        else if(movieType=="Theater")
        {   
            url= base_url+"/discover/movie?primary_release_date.gte=2022-06-15&primary_release_date.lte=2022-08-16"+API_key;
        }
        else if(movieType=="Kids")
        {
            url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
        }
        else {
            url=base_url+`/discover/movie?with_genres=${genresId}&sort_by=popularity.desc`+API_key;
        }
        setUrl(url);

    }
    const handleDropdownChange = (event) =>{
        setGenresId(event.target.value);
        getData();
    }
    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    return(
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            categories.map((value,pos)=>{
                                return(
                                    <li key={pos}><a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                        <DropDown label="genres?" options={allCats} value={genresId} onChange={handleDropdownChange}/>
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name" 
                        className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Card info={res} key={pos}/>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Main;