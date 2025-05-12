
import {  useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/pagination';
import { Link, useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa6";
import '../topRated/TopRated.css'

const TrendingTV = () =>{
    const [Movies,setMovies]=useState([])
    const [error,setError]=useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const getTopRatedmovies =async()=>{
            const response= await tmdbApi.getTvList('popular',{page:1});
            // console.log(response);
            // console.log(response.results[0]);
            if(response && response.results){
                setMovies(response.results)

            }
            else{
                setError('No results found');
            }

        }
        getTopRatedmovies();


    },[])
    const handleClick = (id) => {
        navigate(`/details/tv/${id}`);
    };


    return(
        <>
        {!error&&(
            <div className="rated">
                <div className="container toprated">
                    <div className="title">
                        <h2>Trending TV</h2>
                        <Link to="/series" className='view'>View more</Link>
                    </div>
                    <div className="div-ratied">

                    

                    <Swiper
                    breakpoints={{
                        992:{slidesPerView:6},
                        768:{slidesPerView:5},
                        545:{slidesPerView:4},
                        455:{slidesPerView:3},
                        355:{slidesPerView:2},
                        255:{slidesPerView:1}
                    }}
                    spaceBetween={10}
                    grabCursor={true}
                    pagination={{clickable:true}}
                    modules={[Pagination]}
                    loop={true}
                    className="myswiper"
                    >
                        {Movies.map((movie)=>(
                            <SwiperSlide key={movie.id}>
                                <div className="movie" onClick={() => handleClick(movie.id)}>
                                    <div className="overlay">
                                        <img className="toprated-image" src={apiConfig.w500Image(movie.poster_path)} alt={movie.title}/>
                                        <span className='youtube'><FaYoutube className='icon'/></span>
                                        
                                        <h5>{movie.title}</h5>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    </div>
                </div>
                </div>
        )
        

        }
        
        </>
    )
}

export default TrendingTV;