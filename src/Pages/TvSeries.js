import { useEffect } from "react";
import { useState } from "react";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import './TvSeries.css'
import { FourSquare } from "react-loading-indicators";
import { FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TvSeries =() =>{
    const[series,setSeries]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const [searchquery,setSearchQuery]=useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching,setIsSearching]=useState(false);
    const navigate = useNavigate();




    useEffect(()=>{
        const featchseries =async()=>{
            try{
                 const response = await tmdbApi.getTvList('popular', { page:currentPage});
            if(response && response.results){
                setSeries((prevpage)=>currentPage===1?response.results:[...prevpage,...response.results])
            }
            }catch(error){
                console.error("Error fetching series:", error);
            }
            setTimeout(()=>{
                setLoading(false)

            },2000)
           
            

        }
        featchseries(currentPage)

    },[currentPage])
    
   const handelsearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
        setIsSearching(false);
        setSearchResults([]);
    } else {
        setIsSearching(true);

        try {
            const response = await tmdbApi.search('tv', { query });
            if (response && response.results) {
                setSearchResults(response.results);
            }
        } catch (error) {
            console.error("Error searching series:", error);
        }
    }
};

    const handleClick = (id) => {
        navigate(`/details/tv/${id}`);
    };

    const loadMoreSeries = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };


    return(
        <>
        {loading&&(
            <div className="loading">
                <FourSquare color="#FF0000" size="medium"/>
            </div>
        )}
        <div className="seriespage">
            <div className="top">
                <img src="/image/footer.jpg" alt="imagetop" className="image-top"/>
                <h3 className="title">Series</h3>
            </div>
            <div className="container">
                <div className="search">
                    <input type="search" placeholder="Enter Keyword"
                    value={searchquery} onChange={handelsearch}/>
                    <button className="search-btn">Search</button>
                </div>
                <div className="series">
                    {(isSearching?searchResults:series).map((serie)=>(
                        <div className="serie" key={serie.id} onClick={()=>handleClick(serie.id)}>
                            <div className="overlay">
                                <img src={apiConfig.w500Image(serie.poster_path)} 
                                alt={serie.name} className="serieimage"/>
                                <span className="youtube"><FaYoutube className="icon"/></span>

                                
                            </div>
                            <h5>{serie.name}</h5>
                        </div>
                    ))}

                </div>
                {!isSearching && (
                            <div className='loadmore'>
                                <button onClick={loadMoreSeries}>Load More</button>
                            </div>
                        )}
            </div>
        </div>
        
        </>
    )
}
export default TvSeries;