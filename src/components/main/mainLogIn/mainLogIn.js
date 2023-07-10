import css from './mainLofIn.module.css';
import characters from './Characters.svg';
import lock from './lock.svg';
import logoGoogle from './logo_google.svg';
import logoFacebook from './logo_facebook.svg';
import logoYandex from './logo_yandex.svg';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logInRequest } from '../../../storage/allRequests';

function MainLogIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        login: '',
        password: ''
    })  //console.log(values)

    const [disabled, setDisable] = useState(false)
    const disabledButton = () => {
        const trueButton = (values.login.length && values.password.length) ? true : false
        if(disabled !== trueButton) {
            setDisable(trueButton)
        }
    }
    disabledButton()

    const handleChange = e => {
		const fieldName = e.target.name
		setValues({...values, [fieldName]: e.target.value})
	}
    
    const handleSubmit = e => {
		e.preventDefault()
    }

    const handleClick = () => {
        dispatch(logInRequest(values))  
        setTimeout(() => navigate('/', {replace: true}), 2000) //не перекидывает на главную (?)
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

                    <button className={clsx(css.formButton, {[css.activeButton]: disabled})} onClick={handleClick} disabled={!disabled}>Войти</button>

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