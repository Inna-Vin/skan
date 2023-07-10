import css from './slider.module.css';
import timeImg from './slider-item-time.svg';
import glassImg from './slider-item-glass.svg';
import lockImg from './slider-item-lock.svg';
import arrowRight from './arrowRight.svg';
import arrowLeft from './arrowLeft.svg'
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function SliderImg() {

    const sliderImg = [{
            id: 0,
            img: `${timeImg}`,
            text: '0-Высокая и оперативная скорость обработки заявки'
        },{
            id: 1,
            img: `${glassImg}`,
            text: '1-Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
        },{
            id: 2,
            img: `${lockImg}`,
            text: '2-Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
        },{
            id: 3,
            img: `${timeImg}`,
            text: '3-Высокая и оперативная скорость обработки заявки'
        },{
            id: 4,
            img: `${glassImg}`,
            text: '4-Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
        },{
            id: 5,
            img: `${lockImg}`,
            text: '5-Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
        },{
            id: 6,
            img: `${glassImg}`,
            text: '6-Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    }]

    const [prevNum, setPrevNum] = useState(0) //dekstopSlider
    const [nextNum, setNextNum] = useState(3)
    const handleNextSlice = () => {
        if (nextNum !== sliderImg.length) {
            setNextNum(nextNum + 1)
            setPrevNum(prevNum + 1)
        } else {
            setNextNum(3)
            setPrevNum(0)
        }   
    }
    const handlePrevSlice = () => {
        if(prevNum !== 0) {
            setPrevNum(prevNum - 1)
            setNextNum(nextNum - 1)
        } else {
            setPrevNum(prevNum + 3)
            setNextNum(nextNum + 3)
        }    
    }

    const [curNum, setCurNum] = useState(0) //mobileSlider
    useEffect(() => {
        const lastIndex = sliderImg.length - 1
        if (curNum < 0) {
            setCurNum(lastIndex)
        }
        if (curNum > lastIndex) {
            setCurNum(0)
        }
    }, [sliderImg.length, curNum])

    return (
        <div className={css.wrapper}> 
            <div className={clsx(css.sliderWrap, css.sliderDekstop)}>
                <button className={css.arrowRight} onClick={handlePrevSlice}> <img src={arrowRight} alt='arrow'/> </button>
                {sliderImg.slice(prevNum, nextNum).map(item => {
                    return (
                        <div className={css.sliderItem} key={item.id}>
                            <img className={css.sliderImg} src={item.img} alt='time'/>
                            <p className={css.skiderText}>{item.text}</p>
                        </div>
                    )
                })}
                <button className={css.arrowLeft} onClick={handleNextSlice}> <img src={arrowLeft} alt='arrow'/> </button>
            </div> 
            <div className={css.sliderMobile}>
                <div className={css.imgWrapMobile}>
                    {sliderImg.map((item, index) => {
                        return (
                            <div className={clsx(css.sliderItemMobile, {[css.active] : index === curNum})} key={item.id}>
                                <img className={css.sliderImg} src={item.img} alt='time'/>
                                <p className={css.skiderText}>{item.text}</p>
                            </div>
                        )
                    })}
                </div>
                <div className={css.sliderArrows}>
                    <button className={css.arrowRight} onClick={() => setCurNum(curNum - 1)}> <img src={arrowRight} alt='arrow'/> </button>
                    <button className={css.arrowLeft} onClick={() => setCurNum(curNum + 1)}> <img src={arrowLeft} alt='arrow' /> </button>
                </div>   
            </div> 
        </div>
        
    )
}

export default SliderImg;