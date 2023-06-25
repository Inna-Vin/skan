import css from './mainLofIn.module.css';
import characters from './Characters.svg';
import lock from './lock.svg';
import logoGoogle from './logo_google.svg';
import logoFacebook from './logo_facebook.svg';
import logoYandex from './logo_yandex.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { logIn } from '../../../storage/action';
import { useNavigate } from 'react-router-dom';

function MainLogIn(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
   // const {isAuth} = props
    
    const [values, setValues] = useState({
        login: '',
        password: ''
    })
    console.log(values)

    const handleChange = e => {
		const fieldName = e.target.name
		setValues({...values, [fieldName]: e.target.value})
	}
    
    const handleSubmit = e => {
		e.preventDefault()
    }

    const handleLogIn = () => {
        fetch ('https://gateway.scan-interfax.ru/api/v1/account/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            return response.json()
        })
        .then (data => {
            console.log(data)
            if (data.accessToken) {
            localStorage.setItem('token', JSON.stringify(data.accessToken));
            localStorage.setItem('expire', JSON.stringify(data.expire))
            navigate('/', {replace: true})
            window.location.reload()
            }
            dispatch(logIn(data.accessToken, data.expire))
        })
       
        // .catch (e => {
        //     console.log(e.response.data.message)
        // })
    }

    return (
        <div className={css.mainWrap}>
            <div className={css.left}>
                <h1 className={css.h1}>Для оформления подписки <br /> на тариф, необходимо авторизоваться.</h1>
                <img className={css.img} src={characters} alt='characters' />   
            </div>
            <div className={css.right}>
                <form className={css.form} onClick={handleSubmit}>
                    <img src={lock} className={css.lockImg} alt='lock' />
                    <div className={css.formHeader}>
                        <button className={css.formHeaderButton}>Войти</button>
                        <button className={css.formHeaderButton}>Зарегистрироваться</button>
                    </div>
                    <p className={css.lableInput}>Логин или номер телефона:</p>
                    <input className={css.formInput} type='text' name='login' value={values.login} onChange={handleChange} />

                    <p className={css.lableInput}>Пароль:</p>
                    <input className={css.formInput} type='password' name='password' value={values.password} onChange={handleChange} />

                    {!values.login && !values.password && (
                        <div className={css.output}>заполните все поля</div>
                    )}

                    <button className={css.formButton} onClick={handleLogIn} >Войти</button>

                    <div className={css.formLinkWrap}>
                        <a className={css.restoreLink} href='/'>Восстановить пароль</a>
                    </div>
                    
                    <p className={css.lableInput}>Войти через:</p>
                    <div className={css.formLogInOtherWrap}>
                        <a className={css.buttonLogo} href='/*'><img className={css.logoImg} src={logoGoogle} alt='logo_Google' /></a>
                        <a className={css.buttonLogo} href='/*'><img className={css.logoImg} src={logoFacebook} alt='logo_Facebook' /></a>
                        <a className={css.buttonLogo} href='/*'><img className={css.logoImg} src={logoYandex} alt='logo_Yandex' /></a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MainLogIn;