// import css from './main.module.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './mainHomePage/homePage';
import MainLogIn from './mainLogIn/mainLogIn';
import MainRequest from './mainRequest/mainRequest';

import TarifsCard from './mainHomePage/tarifsCard/tarifsCard';


function Main(props) {

  const {isAuth} = props
    return (
        
        <Routes>
        <Route path='/' element={<HomePage isAuth={isAuth}/>} />
        
        <Route path='/log_in' element={<MainLogIn isAuth={isAuth}/>} />

        <Route path='/request' element={<MainRequest isAuth={isAuth}/>} />

        <Route path='/tarifs' element={<TarifsCard isAuth={isAuth}/>} />
      </Routes>
    )
}

export default Main;