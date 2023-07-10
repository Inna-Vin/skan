 import { Link } from 'react-router-dom';
 import css from './headerLogIn.module.css'
 import MenuMobile from '../menuMobile/menuMobile';

function HeaderLogIn(props) {
    const {isAuth} = props
    return (
        <>
            <div className={css.dekstop}>
                <p className={css.register}>Зарегистрироваться</p>
                <Link to={'/log_in'} className={css.button}>Войти</Link>
            </div>
                
            <MenuMobile isAuth={isAuth} />
        </>
    )
}

export default HeaderLogIn;