import { NavLink } from "react-router-dom";

import './Footer.css'

const Footer =() =>{
    return(
        <>
       <div className="footer">
        <img  className='imagefooter' src="/image/footer.jpg" alt="footer"/>
        <div className="container content">
        <div className="footer-logo">
            <img src="/image/tmovie.png"alt="footerlogo"/>
            <NavLink className='logoname' to="/">tMovies</NavLink>
        </div>
        <div className="nav-footer">
            <ul>
                <li>Home</li>
                <li>Contact Us</li>
                <li>Term of services</li>
                <li>About us</li>
            </ul>
            <ul>
                        <li>Live</li>
                        <li>FAQ</li>
                        <li>Premium</li>
                        <li>Pravacy policy</li>
                    </ul>
                    <ul>
                        <li>You must watch</li>
                        <li>Recent release</li>
                        <li>Top IMDB</li>
                    </ul>
        </div>
       </div>
       </div>
        </>
    )
}
export default Footer;