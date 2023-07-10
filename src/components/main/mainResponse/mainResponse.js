import css from './mainResponse.module.css'
import img from './imgMainResponse.svg'
import arrowRight from '../mainHomePage/slider/arrowRight.svg'
import arrowLift from '../mainHomePage/slider/arrowLeft.svg'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dateFormat from "dateformat";
import DocumentsCards from './ducumentsCards/documentsCards'

function MainResponse (props) {
    const { isAuth } = props
    const navigate = useNavigate()
    const totalDocuments = useSelector(state => state.histograms.totalDocuments)
    const riskFactors = useSelector(state => state.histograms.riskFactors)

    useEffect(() => {
        if (!isAuth) {
            navigate('/log_in', {replace: true})
        }  
    })

    const [prevNum, setPrevNum] = useState(0) //dekstopSlider
    const [nextNum, setNextNum] = useState(7)
    const handleNextSlice = () => {
        setPrevNum(prevNum + 1)
        setNextNum(nextNum + 1)
    }
    const handlePrevSlice = () => {
        setPrevNum(prevNum - 1)
        setNextNum(nextNum - 1)
    }

    const [curNum, setCurNum] = useState(0) //mobileSlider
    useEffect(() => {
        const lastIndex = totalDocuments.length - 1
        if (curNum < 0) {
            setCurNum(lastIndex)
        }
        if (curNum > lastIndex) {
            setCurNum(0)
        }
    }, [curNum, totalDocuments])

    return(
        <div className={css.mainWrap}>
            <div className={css.searchWrap}>
                <div className={css.textWrap}>
                    <h1 className={css.h1}>Ищем. Скоро <br /> будут результаты</h1>
                    <p className={css.p}>Поиск может занять некоторое время,<br /> просим сохранять терпение.</p>
                </div>
                <div className={css.imgWrap}><img className={css.img} src={img} alt='imgSearch' /></div>
            </div>
            <h2 className={css.h2}>Общая сводка</h2>
            <p className={css.text}>Найдено {totalDocuments.length} вариантa(ов)</p>

             {/* sliderDekstop */}
             
            <div className={clsx(css.objectsearchWrap, css.sliderDekstop)}> 
                {(totalDocuments.length >= 7) && (<button className={clsx(css.buttonArrowRight, {[css.activeButton] : (prevNum !== 0)})} onClick={handlePrevSlice} disabled={!(prevNum !== 0)}><img src={arrowRight} alt='arrow_rirht' /></button>)}
                <div className={css.generalSummary}>
                    <div className={css.fieldWrap}>
                        <p className={css.fieldWrapText}>Период</p>
                        <p className={css.fieldWrapText}>Всего</p>
                        <p className={css.fieldWrapText}>Риски</p>
                    </div>
                    <div className={css.slider}>
                        {totalDocuments.length && (totalDocuments.slice(prevNum, nextNum).map(item => {
                            const valueRiskFactor = riskFactors.find(items => items.date === item.date)
                            return (
                                <div key={item} className={css.sliderItem}>
                                    <p className={css.sliderText}>{dateFormat(item.date, 'dd.mm.yyyy')}</p>
                                    <p className={css.sliderText}>{item.value}</p>
                                    <p className={css.sliderText}>{valueRiskFactor.value}</p>
                                </div>
                                
                            )
                        }))}
                    </div>  
                </div>
                {(totalDocuments.length >= 7) && (<button className={clsx(css.buttonArrowLift, {[css.activeButton] : (nextNum !== totalDocuments.length)})} onClick={handleNextSlice} disabled={!(nextNum !== totalDocuments.length)} ><img src={arrowLift} alt='arrow_rirht' /></button>)}  
            </div>

            {/* sliderMobile */}

            <div className={css.sliderMobile}>
                <div className={css.imgWrapMobile}>
                    {totalDocuments.length && (totalDocuments.map((item, index) => {
                        const valueRiskFactor = riskFactors.find(items => items.date === item.date)
                        return (
                            <div className={clsx(css.sliderItemMobile, {[css.active] : index === curNum})}>
                                <div className={css.headerSliderMobile}>
                                    <p className={css.headerText}>Период</p>
                                    <p className={css.headerText}>Всего</p>
                                    <p className={css.headerText}>Риски</p>
                                </div>
                                <div className={css.mainSliderMobile}>
                                    <p className={css.mainText}>{dateFormat(item.date, 'dd.mm.yyyy')}</p>
                                    <p className={css.mainText}>{item.value}</p>
                                    <p className={css.mainText}>{valueRiskFactor.value}</p>
                                </div>
                            </div>
                        )
                    }))}
                </div>
                <div className={css.sliderArrows}>
                    <button className={css.arrowRight} onClick={() => setCurNum(curNum - 1)}> <img src={arrowRight} alt='arrow'/> </button>
                    <button className={css.arrowLeft} onClick={() => setCurNum(curNum + 1)}> <img src={arrowLift} alt='arrow'/> </button>
                </div>   
            </div> 

            <DocumentsCards />
        </div>
    )
}

export default MainResponse