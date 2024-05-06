
import css from './ImageModal.module.css'

export default function ImageModal({ info}) {

    return (
        <div>
            <p className={css.helper}>Press the Esc to close or click anywhere</p>
            {info.description && <p className={css.description}>{info.description}</p>}
            <img className={css.img} src={info.urls.regular} alt={info.alt_description} />
            {info.user.username && <p className={css.author}>Author: {info.user.username}</p>}
        </div>
    )
}