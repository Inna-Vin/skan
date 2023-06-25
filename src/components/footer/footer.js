import css from './footer.module.css';
import logo from './eqw 1.svg';

function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.footerWrap}>
                <img src={logo} alt='logo' />
                <div className={css.info}>
                    <p className={css.infoText}> г. Москва, Цветной б-р, 40 </p>
                    <p className={css.infoText}> +7 495 771 21 11 </p>
                    <a href='mailto:info@skan.ru' className={css.mail}>info@skan.ru</a>
                    <p className={css.coopyrigth}>Copyright. 2022</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;