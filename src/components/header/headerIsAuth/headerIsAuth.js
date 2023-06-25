import css from './headerIsAuth.module.css'
import img from './samsung-memory-hjRC0i0oJxg-unsplash 1.svg'
import {useDispatch, useSelector} from "react-redux";
import { logOut, getInfo } from '../../../storage/action';
import { useEffect } from 'react';

function HeaderIsAuth(props) {

    const { isAuth } = props
    const token = localStorage.getItem('token')
    const userToken = JSON.parse(token)
   
    const usedCompanyCount = useSelector(state => state.usedCompanyCount)
    const companyLimit = useSelector(state => state.companyLimit)
    console.log(usedCompanyCount, companyLimit)
    
    const dispatch = useDispatch()

    const handleClick = (e) => {
        if (isAuth) {
            dispatch(logOut())
            window.location.reload()
        }
    }

    
  useEffect (() => { 
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
            //console.log(data)
            dispatch(getInfo(data.eventFiltersInfo.usedCompanyCount, data.eventFiltersInfo.companyLimit))
        })

    })



    return (
        <div className={css.headerIsAuth}>
            <div className={css.infoLimit}>
                <p className={css.text}>Использованно компаний:</p>
                <p className={css.text}>Лимит по компаниям: </p>
            </div>
            <div className={css.userInfo}>
                <div>
                    <p className={css.name}>Алексей А.</p>
                    <button className={css.button} onClick={handleClick}>Выйти</button>
                </div>
                <img className={css.img} src={img} alt='user' />
            </div>
        </div>
    )
}

export default HeaderIsAuth;