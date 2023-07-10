import css from './App.module.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import { useDispatch } from 'react-redux'
import { logIn, logOut, getInfo } from './storage/action';
import { histogramsRequest } from './storage/allRequests';
import { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import dateFormat, { masks } from "dateformat";


function App(props) {
  const {isAuth} = props
  const dispatch = useDispatch()
 // const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const expire = localStorage.getItem('expire')
  const valuesRequest = localStorage.getItem('valuesRequest');
  const userExpire = JSON.parse(expire)
    const userToken = JSON.parse(token)
    const userValueRequest = JSON.parse(valuesRequest)
  
  useEffect(() => { 
    if (isAuth) {
      dispatch(logIn(token, expire))
    } 
    if (isAuth && valuesRequest) {
      dispatch(histogramsRequest(userToken, userValueRequest))
    }  
  })

  useEffect (() => { 
    const now = new Date()
    const newNow = dateFormat(now, "isoDateTime")
    if (newNow < userExpire) {
            fetch ('https://gateway.scan-interfax.ru/api/v1/account/info', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then (data => {
            dispatch(getInfo(data.eventFiltersInfo.usedCompanyCount, data.eventFiltersInfo.companyLimit))
        })
    } else {
        dispatch(logOut())
        //navigate('/log_in', {replace: true})
    }
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
