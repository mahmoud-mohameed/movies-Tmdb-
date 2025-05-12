import { useEffect, useRef, useState } from "react";
import tmdbApi from '../../api/tmdbApi.js';
import apiConfig from '../../api/apiConfig';
import { FourSquare } from 'react-loading-indicators';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import "swiper/css";
import "./Poster.css"

const Poster = () => {




    const [Movies,setMovies]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error, setError] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const navigate = useNavigate();
    const swiperRef = useRef(null);

    useEffect(() => {
        const getmovies = async() =>{
            try{
                setLoading(true);
                const response=await tmdbApi.getMoviesList('popular', { page: 1 });
                console.log(response)
                if (response && response.results) {
                    setMovies(response.results);
                } else {
                    setError('No results found');
                }
            } catch (err) {
                setError(err.message || 'Something went wrong');
            }

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
        getmovies();
            
        

    }, []);


    const handleClick = (id) => {
        navigate(`/details/movie/${id}`);
    };

    const fetchTrailer = async (movieId) => {
        try {
            const response = await tmdbApi.getVideos("movie", movieId);
            const trailerVideo = response?.results?.find(video => video.type === "Trailer");
            setTrailer(trailerVideo || null);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setTrailer(null);
        }
    };

    const handleShowTrailer = (movieId) => {
        fetchTrailer(movieId);
        setShowModel(true);
        if (swiperRef.current) {
            swiperRef.current.autoplay.stop();
        }
    };
    const handleCloseTrailer = () => {
        setShowModel(false);
        if (swiperRef.current) {
            swiperRef.current.autoplay.start();
        }
    };



    return (
        <>
        
        {loading && (
            <div className="loading">
                <FourSquare color="#FF0000" size="medium"/>
            </div> 
        )}
        {!loading&&!error&&(
            <div className='main'>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                            delay: 30000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                          grabCursor={true}
                        loop={true}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper">
                        {Movies.map(movie => (
                            <SwiperSlide key={movie.id}>
                                <div className='poster'>
                                    <div className='overlay'></div>
                                    <img className='posterimage'
                                        src={apiConfig.originalImage(movie.backdrop_path)}
                                        alt={movie.title}
                                    />
                                    <div className='container top'>
                                        <div>
                                            <img className='image'
                                                src={apiConfig.w500Image(movie.poster_path)}
                                                alt={movie.title}
                                            />
                                        </div>
                                        <div className='info'>
                                            <h1>{movie.title}</h1>
                                            <p>{movie.overview}</p>
                                            <button className='now' onClick={() => handleClick(movie.id)}>Watch now</button>
                                            <button className='trailer' onClick={() => handleShowTrailer(movie.id)}>
                                                Watch trailer
                                            </button>
                                        </div>
                                    </div>
                                    <div className="trailerdiv container">
                                        {showModel && trailer && (
                                            <div className='model'>
                                                <div className="video">
                                                    <FaXmark className="close-btn" onClick={handleCloseTrailer} />
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                                        title={trailer.name}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    
            </Swiper>
            </div>
        )}



</>

);
}

export default Poster;