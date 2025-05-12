import './App.css'
import { Fragment } from "react";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import TvSeries from './Pages/TvSeries';
import Details from './Pages/Details';





const Layout= () =>{
  return(
    <>
    <Header/>
    <Outlet/>
    
    <Footer/>
    </>
  )
}
const routers =createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='/movies' element={<Movies />} />
    <Route path='/series' element={<TvSeries />} />
    <Route path="/details/:type/:id" element={<Details />} />
    </Route>
    </>
  )
)
function App() {
  return (
    <Fragment>
    <RouterProvider router={routers} />  
    </Fragment>
  

  );
}

export default App;