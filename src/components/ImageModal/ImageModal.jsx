import Modal from 'react-modal';
import css from './ImageModal.module.css'

const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
    width: '700px',
      height: '500px',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
  },
};


Modal.setAppElement('#root');

export default function ImageModal({info, isOpen, onRequestClose}) {

    return (

            <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            >
                <p className={css.helper}>Press the Esc to close or click anywhere</p>
            {info.description && <p className={css.description}>{info.description}</p>}
            <img className={css.img} src={info.urls.regular} alt={info.alt_description} />
            {info.user.username && <p className={css.author}>Author: {info.user.username}</p>}
            </Modal>

    )
}