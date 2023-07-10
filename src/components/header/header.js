import css from './header.module.css';
import { Link } from 'react-router-dom';
import logo from './SGN_09_24_2022_1663968217400 1.svg'
import HeaderLogIn from './headerLogIn/headerLogIn'
import HeaderIsAuth from './headerIsAuth/headerIsAuth';

function Header(props) {

    const {isAuth} = props
    
    return(
        <header className={css.header}>
            <img src={logo} alt='logo' />
            <div className={css.nav}>
                <Link to='/' className={css.navLink}>Главная</Link>
                <Link to={'/tarifs'} className={css.navLink}>Тарифы</Link>
                <a href='/' className={css.navLink}>FAQ</a>
            </div>
            <div className={css.logIn}>
                {isAuth ? ( <HeaderIsAuth isAuth={isAuth}/> ) : ( <HeaderLogIn /> )}
            </div>
        </header>
    )
}

export default Header;