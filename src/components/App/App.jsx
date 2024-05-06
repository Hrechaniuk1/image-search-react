import { useState, useRef } from "react"
import Modal from 'react-modal';

import SearchBar from "../SearchBar/SearchBar"
import Fetch from "../Fetching/Fetch"
import ImageGallery from "../ImageGallery/ImageGallery"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import Loader from "../Loader/Loader"
import ImageModal from "../ImageModal/ImageModal"
import ErrorMessage from "../ErrorMessage/ErrorMessage";


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

export default function App() {

    const [imgs, setImgs] = useState([])
    const [page, setPage] = useState(1)
    const [keyWord, setKeyWord] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dataModal, setDataModal] = useState({})
    // --------------------------------------------
    const imgRef = useRef()
    
    
   async function submitHandler(value) {
       try {
           setError(false)
           setLoader(true)
           setImgs([])
           const data = await Fetch(value)
           setKeyWord(value)
           setLoader(false)
           setImgs(data.results)
           setTotalPages(data.total_pages)
           setPage(page+1)
           
       } catch (error) {
           setError(true)
        }
   }
    
    async function clickHandler() {
        try {
            setError(false)
            setLoader(true)
            const data = await Fetch(keyWord, page)
            const results = data.results
            setLoader(false)
            setImgs([...imgs, ...results])
            setPage(page + 1)
            setTimeout(() => {
                scroll()
            },100)
            
        } catch (error) {
            setError(true)
        } 
   } 
    function openModal(data) {
        setIsOpen(true);
        setDataModal(data)
        
    }

  function closeModal() {
    setIsOpen(false);
  }
    
    function scroll() {
    imgRef.current.childNodes[0] && window.scrollBy({
                top: (imgRef.current.childNodes[0].getBoundingClientRect().height * 2),
            left: 0,
                behavior: "smooth",
            })
}

    return (
        <>
            <SearchBar
            onFind={submitHandler}
            ></SearchBar>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            >
                <ImageModal
                info={dataModal}
                ></ImageModal>
            </Modal>
            {error && <ErrorMessage></ErrorMessage>}
            
            <ImageGallery
                data={imgs}
                openModal={openModal}
                ref={imgRef}
            >                
            </ImageGallery>
            {loader && <Loader></Loader>}
            {totalPages>page && <LoadMoreBtn
                onLoadMore={clickHandler}
            ></LoadMoreBtn>}
            
        </>
    )
}