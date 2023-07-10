import css from './headerIsAuth.module.css'
import img from './samsung-memory-hjRC0i0oJxg-unsplash 1.svg'
import {useDispatch, useSelector} from "react-redux";
import { logOut } from '../../../storage/action';
import MenuMobile from '../menuMobile/menuMobile'

function HeaderIsAuth(props) {
    const { isAuth } = props
    const usedCompanyCount = useSelector(state => state.usedCompanyCount)
    const companyLimit = useSelector(state => state.companyLimit)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        if (isAuth) {
            dispatch(logOut())
            window.location.reload()
        }
    }

    return (
        <div className={css.headerIsAuth}>
            <div className={css.infoLimit}>
                <p className={css.text}>Использованно компаний <span className={css.usedCompany}> {usedCompanyCount} </span></p>
                <p className={css.text}>Лимит по компаниям <span className={css.limits}> {companyLimit} </span></p>
            </div>

            <div className={css.userInfo}>
                <div>
                    <p className={css.name}>Алексей А.</p>
                    <button className={css.button} onClick={handleClick}>Выйти</button>
                </div>
                <img className={css.img} src={img} alt='user' />
            </div>

            <MenuMobile isAuth={isAuth} />
        </div>
    )
}

export default HeaderIsAuth;