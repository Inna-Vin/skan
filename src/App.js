import css from './App.module.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import { useDispatch } from 'react-redux'
import { logIn } from './storage/action';
import { useEffect } from 'react';


function App(props) {
  const {isAuth} = props
  const dispatch = useDispatch()
  //const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  const expire = localStorage.getItem('expire')
  
  useEffect(() => {
    dispatch(logIn(token, expire))
  })


  return (
    <div className={css.wrap}>
      <Router>
          <Header isAuth={isAuth}/>
          <Main isAuth={isAuth}/>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
