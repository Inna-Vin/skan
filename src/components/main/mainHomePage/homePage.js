import css from './homePage.module.css';
import { Link } from 'react-router-dom';
import img from './2398 1.svg';
import bunner from './bunner.svg';
import SliderImg from './slider/slider';
import TarifsCard from './tarifsCard/tarifsCard';


function HomePage(props) {

   const {isAuth} = props

    return( 
        <main>
            <div className={css.sectionRequest}>
                <div className={css.left}>
                    <h1 className={css.title}>сервис по поиску<br />
                        публикаций<br />
                        о компании<br />
                        по его ИНН</h1>
                    <p className={css.text}>Комплексный анализ публикаций, получение данных <br /> в формате PDF на электронную почту.</p>
                    {isAuth && <Link to={'/request'} className={css.button}>Запросить данные</Link>}
                </div>
                <div className={css.rigth}>
                    <img src={img} className={css.img} alt='img'/>
                </div>
            </div>
            <h2 className={css.h2}>Почему именно мы</h2>
            <SliderImg />
            <img className={css.bunner} src={bunner} alt='bunner'/>
            <TarifsCard isAuth={isAuth}/>          
        </main>
    )
}

export default HomePage;