import css from './slider.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import timeImg from './slider-item-time.svg';
import glassImg from './slider-item-glass.svg';
import lockImg from './slider-item-lock.svg';

function SliderImg() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };

    return (
        <Slider {...settings} className={css.wrapSlider}>
            <div className={css.sliderItem}>
                <img className={css.sliderImg} src={timeImg} alt='time'/>
                <p className={css.skiderText}>Высокая и оперативная скорость обработки заявки</p>
            </div>
            <div className={css.sliderItem}>
                <img className={css.sliderImg} src={glassImg} alt='glass'/>
                <p className={css.skiderText}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
            </div>
            <div className={css.sliderItem}>
                <img className={css.sliderImg} src={lockImg} alt='lock'/>
                <p className={css.skiderText}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
            </div>
            <div className={css.sliderItem}>
                <img className={css.sliderImg} src={timeImg} alt='time'/>
                <p className={css.skiderText}>Высокая и оперативная скорость обработки заявки</p>
            </div>
            <div className={css.sliderItem}>
                <img className={css.sliderImg} src={glassImg} alt='glass'/>
                <p className={css.skiderText}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
            </div>
            <div className={css.sliderItem}>
                <img className={css.sliderImg} src={lockImg} alt='time'/>
                <p className={css.skiderText}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
            </div>
        </Slider>
    )
}

export default SliderImg;