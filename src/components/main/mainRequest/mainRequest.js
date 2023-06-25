import css from './mainRequest.module.css';
import clsx from 'clsx';
import character from './character.svg';

function MainRequest() {

    const handleSubmit = e => {
		e.preventDefault()
    }

    return (
        <div className={css.mainWrap}>
            <h1 className={css.h1}>Найдите необходимые<br /> данные в пару кликов.</h1>
            <p className={css.text}>Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</p>
            <div className={css.formWrap}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.formInputs}>
                        <p className={css.lableInput}>ИНН компании <span className={css.up}>*</span></p>
                        <input className={css.formInput} type='text' placeholder='10 цифр' />

                        <p className={css.lableInput}>Тональность</p>
                        <select className={clsx(css.formInput, css.select)}>
                            <option className={css.option}>Любая</option>
                            <option className={css.option}>Позитивная</option>
                            <option className={css.option}>Негативная</option>
                        </select>

                        <p className={css.lableInput}>Количество документов в выдаче <span className={css.up}>*</span></p>
                        <input className={css.formInput} type='text' placeholder='От 1 до 1000' />

                        <p className={css.lableInput}>Диапазон поиска <span className={css.up}>*</span></p>
                        <div className={css.inputDateWrap}>
                            <input className={clsx(css.formInput, css.inputDate)} type='date' placeholder='Дата начала'/>
                            <input className={clsx(css.formInput, css.inputDate)} type='date' placeholder='Дата конца'/>
                        </div>    
                    </div>
                    <div className={css.formCheckboxs}>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Признак максимальной полноты</p>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Упоминания в бизнес-контексте</p>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Главная роль в публикации</p>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Публикации только с риск-факторами</p>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Включать технические новости рынков</p>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Включать анонсы и календари</p>
                        <p className={css.checkboxText}><input className={css.inputCheckbox} type='checkbox' /> Включать сводки новостей</p>

                        <div className={css.buttonWrap}>
                            <button className={css.button}>Поиск</button>
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