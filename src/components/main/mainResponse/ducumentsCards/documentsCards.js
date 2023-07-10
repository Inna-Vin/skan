import css from './documentsCards.module.css'
import documentImg from '../Снимок экрана 2022-09-24 в 20.24 1.png'
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import dateFormat from "dateformat";


function DocumentsCards() {
    const documentsItem = useSelector(state => state.documents.items)
    const parse = require('html-react-parser');

    const [lazyLoading, setlazyloadind] = useState(10)
    const handleLazyLoading = () => {
        setlazyloadind(lazyLoading + 10)
    }

    return (
        <>
            {documentsItem.length ? 
                (<div className={css.documentsWrap}>
                    <h2 className={css.h2}>Список документов</h2>
                    <div className={css.outputDocuments}>
                        {documentsItem.slice(0, lazyLoading).map(item => {
                            const cleanMarkup = DOMPurify.sanitize(item.ok.content.markup, { USE_PROFILES: { html: true } })
                            const images = cleanMarkup.match(/img src="(.*?)"/m)
                            return (
                                <div className={css.documentItem}>
                                    <div className={css.documentHeader}>
                                        <p className={css.date}>{dateFormat(item.ok.issueDate, 'dd.mm.yyyy')}</p>
                                        <a className={css.link} href={item.ok.url} target="_blank" rel="noreferrer">{item.ok.source.name}</a>
                                    </div>
                                    <h3 className={css.h3}>{item.ok.title.text}</h3>
                                    <div className={css.documentsImgWrap} >  <img src={images ? (images[1]) : (documentImg)} alt='img' className={css.docunentsImg} /> </div>
                                    <p className={css.text}>{parse((cleanMarkup)).slice(0,800).replace(/<.*?>/g, ' ')}...</p>
                                    <button className={css.button}><a href={item.ok.url} className={css.linkButton} target="_blank" rel="noreferrer">Читать в источнике</a></button>
                                </div>
                            )
                        })}
                    </div>
                    {(lazyLoading < documentsItem.length) && (<button className={css.buttonLazyLoading} onClick={handleLazyLoading}>Показать больше</button>)}
                </div>
            ) : (
                <div className={css.errorText}>Публикации не Найдены</div>
            )}
        </>
    )
}

export default DocumentsCards