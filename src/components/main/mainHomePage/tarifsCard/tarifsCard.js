import css from './tarifsCard.module.css';
import clsx from 'clsx';
import lampa from './lampa.svg';
import darts from './darts.svg';
import laptop from './laptop.svg';

function TarifsCard(props) {
    const {isAuth} = props

    return (
        <div className={css.wrap}>
        <h2 className={css.h2}>наши тарифы</h2>
        <div className={css.tarifCardWrap}>
            <div className={clsx(css.tarifCardItem, {[css.currentTariffBorder] : isAuth})}>
                <div className={clsx(css.header, css.n1)}>
                    <h3 className={css.h3}>Beginner</h3>
                    <p className={css.text}>Для небольшого исследования</p>
                    <img className={css.img} src={lampa} />
                </div>
                <div className={css.tarifInfo}>
                    <div className={css.price}>
                        <h3 className={css.h3}>799 ₽</h3>
                        <h4 className={css.h4}>1 200 ₽</h4>
                        {isAuth && (<p className={css.currentTariff}>Текущий тариф</p>)}
                    </div>
                    <p className={css.text}>или 150 ₽/мес. при рассрочке на 24 мес.</p>
                    <p className={css.listTitle}>В тариф входит:</p>
                    <ul>
                        <li className={css.listTitleItem}>Безлимитная история запросов</li>
                        <li className={css.listTitleItem}>Безопасная сделка</li>
                        <li className={css.listTitleItem}>Поддержка 24/7</li>
                    </ul>
                    <button className={clsx(css.button, {[css.currentTariffButton] : isAuth})}>{isAuth ? 'Перейти в личный кабинет' : 'Подробнее'}</button>
                </div>
            </div>

            <div className={css.tarifCardItem}>
                <div className={clsx(css.header, css.n2)}>
                    <h3 className={css.h3}>Pro</h3>
                    <p className={css.text}>Для HR и фрилансеров</p>
                    <img className={css.img} src={darts} />
                </div>
                <div className={css.tarifInfo}>
                    <div className={css.price}>
                        <h3 className={css.h3}>1 299 ₽</h3>
                        <h4 className={css.h4}>2 600 ₽</h4>
                    </div>
                    <p className={css.text}>или 279 ₽/мес. при рассрочке на 24 мес.</p>
                    <p className={css.listTitle}>В тариф входит:</p>
                    <ul>
                        <li className={css.listTitleItem}>Все пункты тарифа Beginner</li>
                        <li className={css.listTitleItem}>Экспорт истории</li>
                        <li className={css.listTitleItem}>Рекомендации по приоритетам</li>
                    </ul>
                    <button className={css.button}>Подробнее</button>
                </div>
            </div>

            <div className={css.tarifCardItem}>
                <div className={clsx(css.header, css.n3)}>
                    <h3 className={css.h3}>Business</h3>
                    <p className={css.text}>Для корпоративных клиентов</p>
                    <img className={css.img} src={laptop} />
                </div>
                <div className={css.tarifInfo}>
                    <div className={css.price}>
                        <h3 className={css.h3}>2 379 ₽</h3>
                        <h4 className={css.h4}>3 700 ₽</h4>
                    </div>
                    <p className={clsx(css.listTitle, css.listTitleTop)}>В тариф входит:</p>
                    <ul>
                        <li className={css.listTitleItem}>Все пункты тарифа Pro</li>
                        <li className={css.listTitleItem}>Безлимитное количество запросов</li>
                        <li className={css.listTitleItem}>Приоритетная поддержка</li>
                    </ul>
                    <button className={css.button}>Подробнее</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TarifsCard;