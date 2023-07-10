import css from './mainRequest.module.css';
import clsx from 'clsx';
import character from './character.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateInn, validateLimit, validateDate } from './validation';
import { histogramsRequest } from '../../../storage/allRequests';
import { useDispatch } from "react-redux";

function MainRequest(props) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const userToken = JSON.parse(token)
    const { isAuth } = props 

    useEffect(() => {
        if (!isAuth) {
            navigate('/log_in', {replace: true})
        }
    })

    const [valuesRequest, setValuesRequest] = useState({
        inn: '',
        tonality: 'any',
        limit: '',
        startDate: '',
        endDate: '',
        maxFullness: false,
        inBusinessNews: false,
        onlyMainRole: false,
        onlyWithRiskFactors: false,
        excludeTechNews: false,
        excludeAnnouncements: false,
        excludeDigests: false,
    })

    const handleChange = (e) => {
        const fieldName = e.target.name
        const { target } = e;
        if (target.type === 'checkbox') {
            setValuesRequest({...valuesRequest, [fieldName]: e.target.checked})
        } else {
            setValuesRequest({...valuesRequest, [fieldName]: e.target.value})
        }
    } //console.log(valuesRequest)

    const innIsValid = validateInn(valuesRequest.inn)
    const limitsIsValid = validateLimit(valuesRequest.limit)
    const dateIsValid = validateDate(valuesRequest.startDate, valuesRequest.endDate)

    const [formValid, setFormValid] = useState(false);
    const validate = () => {
        const isCredentialsValid = innIsValid.innIsValid && limitsIsValid.limitsIsValid && dateIsValid.dateIsValid
        if(isCredentialsValid !== formValid)
        setFormValid(isCredentialsValid)
    }
    validate()
    
    const handleSubmit = e => {
		e.preventDefault()
    }

    const handleClick = () => {
        dispatch(histogramsRequest(userToken, valuesRequest))
        localStorage.setItem('valuesRequest', JSON.stringify(valuesRequest));
        setTimeout(() => navigate('/response', {replace: true}), 2000)
    }
    
    return (
        <div className={css.mainWrap}>
            <h1 className={css.h1}>Найдите необходимые<br /> данные в пару кликов.</h1>
            <p className={css.text}>Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</p>
            <div className={css.formWrap}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.formInputs}>
                        <p className={css.lableInput}>ИНН компании<span className={css.up}>*</span></p>
                        <input className={clsx(css.formInput, /*{[css.validateBorder]: !innIsValid.innIsValid}*/ )} type='text' placeholder='10 цифр' name='inn' value={valuesRequest.inn} onChange={handleChange} required/>
                        {valuesRequest.inn && (<div className={css.fieldValid}>{innIsValid.message}</div>)}

                        <p className={css.lableInput}>Тональность</p>
                        <select className={clsx(css.formInput, css.select)} name='tonality' value={valuesRequest.tonality} onChange={handleChange}>
                            <option className={css.option} value={'any'}>Любая</option>
                            <option className={css.option} value={'positive'}>Позитивная</option>
                            <option className={css.option} value={'negative'}>Негативная</option>
                        </select>

                        <p className={css.lableInput}>Количество документов в выдаче<span className={css.up}>*</span></p>
                        <input className={css.formInput} type='text' placeholder='От 1 до 100' name='limit' value={valuesRequest.limit} onChange={handleChange} required/>
                        {valuesRequest.limit && (<div className={css.fieldValid}>{limitsIsValid.message}</div>)}

                        <p className={css.lableInput}>Диапазон поиска<span className={css.up}>*</span></p>
                        <div className={css.inputDateWrap}>
                            <input className={clsx(css.formInput, css.inputDate)} type='date' placeholder='Дата начала' name='startDate' onChange={handleChange} value={valuesRequest.startDate}/>
                            <input className={clsx(css.formInput, css.inputDate)} type='date' placeholder='Дата конца' name='endDate' onChange={handleChange} value={valuesRequest.endDate}/>
                        </div>
                        {valuesRequest.startDate && valuesRequest.endDate && (<div className={clsx(css.fieldValid, css.dateValid)}>{dateIsValid.massage}</div>)}    
                    </div>
                    <div className={css.formCheckboxs}>
                        <div className={css.checkboxMobile}>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' name='maxFullness' onChange={handleChange} checked={valuesRequest.maxFullness}/> Признак максимальной полноты</p>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' name='inBusinessNews' onChange={handleChange} checked={valuesRequest.inBusinessNews}/> Упоминания в бизнес-контексте</p>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox'  name='onlyMainRole' onChange={handleChange} checked={valuesRequest.onlyMainRole}/> Главная роль в публикации</p>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox'  name='onlyWithRiskFactors' onChange={handleChange} checked={valuesRequest.onlyWithRiskFactors}/> Публикации только с риск-факторами</p>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox'  name='excludeTechNews' onChange={handleChange} checked={valuesRequest.excludeTechNews}/> Включать технические новости рынков</p>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox'  name='excludeAnnouncements' onChange={handleChange} checked={valuesRequest.excludeAnnouncements}/> Включать анонсы и календари</p>
                            <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' name='excludeDigests' onChange={handleChange} checked={valuesRequest.excludeDigests}/> Включать сводки новостей</p>
                        </div>

                        <div className={css.buttonWrap}>
                            <button className={clsx(css.button, {[css.activeButton]: formValid})} onClick={handleClick} disabled={!formValid}>Поиск</button>
                            <p className={css.remarkText}>* Обязательные к заполнению поля</p>
                        </div>
                    </div>
                </form>
                <img className={css.characterImg} src={character} alt='character' />
            </div>
        </div>
    )
}

export default MainRequest;