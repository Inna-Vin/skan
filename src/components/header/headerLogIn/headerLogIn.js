 import { Link } from 'react-router-dom';
 import css from './headerLogIn.module.css'

function HeaderLogIn() {
    return (
        <>
            <p className={css.register}>Зарегистрироваться</p>
            <Link to={'/log_in'} className={css.button}>Войти</Link>
        </>
    )
}

export default HeaderLogIn;