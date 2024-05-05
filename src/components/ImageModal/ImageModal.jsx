
import css from './ImageModal.module.css'

export default function ImageModal({ info, closeModal, CloseByBtn }) {

    return (
        <div onKeyDown={CloseByBtn} onClick={closeModal} className={css.modalWindow}>
            <p className={css.helper}>Press the Esc to close or click anywhere</p>
            <div className={css.imgContainer}>
                <img className={css.img} src={info.urls.regular} alt={info.alt_description} />
            </div>
        </div>
    )
}