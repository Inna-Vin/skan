import css from './menuMobile.module.css'
import burgerMenu from '../headerIsAuth/burgerMenu.svg'
import logoMenuMobile from '../headerIsAuth/logoMenuMobile.svg'
import closeMenu from '../headerIsAuth/closeMenu.svg'
import { useDispatch } from "react-redux";
import { logOut } from '../../../storage/action';
import { useState } from 'react';
import { Link } from 'react-router-dom'

function MenuMobile(props) {
    const dispatch = useDispatch()
    const { isAuth } = props
    const [visibleMenu, setVisibleMenu] = useState(false)

    const handleLogOut = () => {
        dispatch(logOut())
        setVisibleMenu(false)
        window.location.reload()
    }

    return (
        <>
            <button className={css.burgerMenu} onClick={() => setVisibleMenu(!visibleMenu)}><img src={burgerMenu} alt='menu' /></button>
                
            {visibleMenu && (
                <div className={css.menuMobile}>
                    <div className={css.headerMenuMobile}>
                        <img src={logoMenuMobile} alt='logo' />
                        <button className={css.closeBurgerMenu} onClick={() => setVisibleMenu(!visibleMenu)}><img src={closeMenu} alt='close_menu' /> </button> 
                    </div>
                    <div className={css.navMenuMobile}>
                        <Link to='/' className={css.navLink}>Главная</Link>
                        <Link to={'/tarifs'} className={css.navLink}>Тарифы</Link>
                        <a href='/' className={css.navLink}>FAQ</a>
                        {!isAuth ? (
                            <>
                                <a href='/' className={css.register}>Зарегистрироваться</a>
                                <Link to={'/log_in'} className={css.buttonLogIn}>Войти</Link>
                            </>
                        ) : (
                            <>
                                <p className={css.userName}>Алексей А.</p>
                                <button className={css.buttonLogOut} onClick={handleLogOut}>Выйти</button>
                            </>
                        )}
                        
                    </div>    
                </div>
            )} 
        </>
    )
}

export default MenuMobile