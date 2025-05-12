import './Movies.css'
import apiConfig from '../api/apiConfig';
import tmdbApi from '../api/tmdbApi';
import { useEffect, useState } from 'react';
import { FourSquare } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';

const Movies = () =>{
    const [movies,setMovies]=useState([])
    const [loading,setLoading]=useState(true)
     const [currentPage, setCurrentPage] = useState(1);
     const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
     const navigate = useNavigate();



     useEffect(()=>{
        const fatchmovies = async()=>{
            try{
                const response = await tmdbApi.getMoviesList('popular', { page:currentPage });
                if(response && response.results){
                    setMovies((prevmovies)=>  currentPage===1?response.results:[...prevmovies, ...response.results])
                }

            }
            catch(error){
                console.error("Error fetching movies:", error);
            }
            setTimeout(()=>{
            setLoading(false)
            },2000)
        }
        fatchmovies(currentPage)

    },[currentPage])

    const loadMoreMovies = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };


    const handleClick = (id) => {
        navigate(`/details/movie/${id}`);
    };


    const handelsearch = async (e)=>{
        const query= e.target.value.toLowerCase();
        setSearchQuery(query);
        if(query ===""){
            setIsSearching(false);
            setSearchResults([]);

        }
        else{
            setIsSearching(true);
        }
        try{
            const response = await tmdbApi.search('movie', { query })
            if(response && response.results){
                setSearchResults(response.results);
            }
        
        }
        catch (error) {
                console.error("Error searching movies:", error);
            }
         
    }
    return(
        <>
        {loading &&(
        <div className='loading'>
            <FourSquare color="#FF0000" size="medium"/>
        </div>
        )}
        <div className='moviepage'>
        <div className='top'>
            <img src='/image/footer.jpg' alt='imagetop' className='imagetop'/>
            <h3 className='title'>Movies</h3>
        </div>
        <div className='container'>
            <div className='search'>
                <input type='search' placeholder='Enter Keyword'
                value={searchQuery}
                onChange={handelsearch}/>
                <button>Search</button>
            </div>
            <div className='movies'>
                {(isSearching?searchResults:movies).map((movie)=>(
                    <div key={movie.id} className='movie' onClick={()=>handleClick(movie.id)}>
                        <div className='overlay'>
                        <img src={apiConfig.w500Image(movie.poster_path)} alt={movie.title} />
                        <span className='youtube'>
                            <FaYoutube className='icon'/>
                        </span>
                    </div>
                    <h5>{movie.title}</h5>
                     
                    </div>

                ))}
            </div>
            {!isSearching &&(
                <div className='loadmore'>
                    <button onClick={loadMoreMovies}>Load More</button>
                </div>
            )}

        </div>
        </div>
       
        </>
    )
}
export default Movies;