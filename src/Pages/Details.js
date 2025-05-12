import { useEffect } from "react";
import { useState } from "react";
import {  useParams } from "react-router-dom"
import apiConfig from '../api/apiConfig'
import tmdbApi from '../api/tmdbApi'
import './Details.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { FaYoutube } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';



const Details = () =>{
    const {id,type}=useParams();
    const [details,setDetails]=useState(null);
    const [cast,setCast]=useState([]);
    const [videos,setVideos]=useState([]);
    const [similar,setSimilar]=useState([])
     const navigate = useNavigate();
    


    useEffect(()=>{
        // console.log("id:", id, "type:", type);
        const getDetails = async ()=>{

            try{
                const response= await tmdbApi.getDetails(type,id);
                console.log(response)
                setDetails(response)
            }
            catch(error){
                console.log("Error fetching details",error)
            }
        }


        const getcast = async ()=>{
            try{
            const response =await tmdbApi.credits(type,id);
            console.log(response.cast)
            
            setCast(response?.cast || [])
        }
        catch(error){
            console.log("Error fetching cast",error)
        }
        }

        const getVideos =async ()=>{
            try{
            const response =await tmdbApi.getVideos(type,id)
            setVideos(response?.results || [])
        }
        catch(error){
            console.log("Error fetching videos",error)
        }
        }


        const fetchSimilar = async () =>{
            try{
                const response =await tmdbApi.similar(type,id)
                setSimilar(response?.results || [])
            }
            catch(error){
                console.log("Error fetching videos simillar ",error)
            }
        }

        getDetails();
        getVideos();
        getcast();
        fetchSimilar();


    },[type,id])

    const handleClick = (id) => {
        navigate(`/details/movie/${id}`);
    };

    if (!details) return <p>Loading...</p>;

    return(
        <div className="detailspage">
            <div className="posterdiv">
                <div className="poster">
                    <div className="overlay"></div>
                    <div className="posterimage">
                        <img src={apiConfig.originalImage(details.backdrop_path)}
                        alt={details.name ||details.title} />
                    </div>
                </div>
                <div className="container info">
                    <div className="imagediv">
                        <img className="imginfo" src={apiConfig.w500Image(details.poster_path)} 
                        alt={details.name || details.title}/>
                    </div>
                    <div className="details">
                        <h1>{details.name || details.title}</h1>
                        <div className="genres">
                            {details.genres?.map((genre)=>(
                                <p key={genre.id}>{genre.name}</p>
                            ))}
                        </div>
                        <p className="overview">{details.overview}</p>
                        <div className="cast">
                        <h2>Casts</h2>
                        {cast.length>0 && (
                            <div className="castdiv">
                                {cast.slice(0,6).map((actor)=>(
                                    <div className="aceorinfo" key={actor.id}>
                                        {actor.profile_path &&(
                                        <div className="actorimage">
                                            <img src={apiConfig.w500Image(actor.profile_path)}
                                            alt={actor.name}/>
                                        </div>
                                        )}
                                        <p>{actor.name}</p>
                                    </div>
                                ))}
                            </div>

                        )}
                    </div>
                    </div>
                    
                    
                </div>
                
            </div>
            <div className="videos container">
                {videos.length > 0 ? (
                    <div>
                        {videos.slice(0, 5).map((video, index) => (
                            <div key={index} className="video">
                                <h2>{video.name}</h2>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                ) : (
                    <> </>
                )}
                </div>


<div className='similar container'>
                {similar.length > 0 ? (
                    <div>
                        <h2>Similar</h2> 
                        <Swiper
                            breakpoints={{
                                992: { slidesPerView: 6 },
                                768: { slidesPerView: 5 },
                                545: { slidesPerView: 4 },
                                440: { slidesPerView: 3 },
                                355: { slidesPerView: 2 },
                                250: { slidesPerView: 1 },
                            }}
                            spaceBetween={10}
                            grabCursor={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {similar.map(similar => (
                                <SwiperSlide key={similar.id}>
                                    <div className='similardiv' onClick={() => handleClick(similar.id)}>
                                        <div className='overlay'>
                                            <img className='similarimg'
                                                src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
                                                alt={similar.title}
                                            />
                                            <span className='youtube'><FaYoutube className='icon' /></span>
                                        </div>
                                        <h5>{similar.title}</h5>
                                    </div>
                                </SwiperSlide>
                            ))
                            }
                        </Swiper>
                    </div>
                ) : (
                    <> </>
                )}
            </div>

        </div>
    )
}
export default Details;