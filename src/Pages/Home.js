import Poster from "../components/Poster/Poster";
import TopRated from "../components/topRated/TopRated";
import TopRatedTV from "../components/TopRatedTV/TopRatedTV";
import TrendingMovies from "../components/TrendingMovies/TrendingMovies";
import TrendingTV from "../components/TrendingTV/TrendingTV";


const Home = () => {
    return(
      <>
      <Poster />
      <TrendingMovies/>
      <TopRated/>
      <TrendingTV/>
      <TopRatedTV/>
      </>
   
    )
}
export default Home;