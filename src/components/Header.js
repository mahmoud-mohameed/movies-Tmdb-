import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import "./Header.css"



const Header = ()=>{
    const [scrolling, setScrolling] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return(
        <>
        <div className={`header ${scrolling ? 'scrolled' : ''}`}>
            <div className="header container">
            <div className="header-logo">
                <img src= "/image/tmovie.png" alt="logo"/>
                <NavLink className ="logoname" to ="/">tMovies</NavLink>

            </div>
            <div className="nav">
                <NavLink className={({isActive}) => isActive ?"link active" : "link"} to="/">Home</NavLink>
                <NavLink className={({isActive}) => isActive ?"link active" : "link"} to="/movies">Movies</NavLink>
                <NavLink className={({isActive}) => isActive ?"link active" : "link"} to="/series">TV Series</NavLink>
            </div>
            </div>
        </div>
        <div className='navbottom'>
                <NavLink className={({ isActive }) => isActive ? "link active" : "link"} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? "link active" : "link"} to="/movies">Movies</NavLink>
                <NavLink className={({ isActive }) => isActive ? "link active" : "link"} to="/series">TV Series</NavLink>
            </div>
        </>
    )
}
export default Header;