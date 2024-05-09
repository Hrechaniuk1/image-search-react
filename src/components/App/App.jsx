import { useState, useRef, useEffect } from "react"

import SearchBar from "../SearchBar/SearchBar"
import fetch from "../../Fetching/fetch"
import ImageGallery from "../ImageGallery/ImageGallery"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import Loader from "../Loader/Loader"
import ImageModal from "../ImageModal/ImageModal"
import ErrorMessage from "../ErrorMessage/ErrorMessage";


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
    
    function submitHandler(value) {
        setKeyWord(value)
        setPage(1)
        setImgs([])
    }
    function clickHandler() {
        setPage(page + 1)
    }

    useEffect(() => {
        async function onFetch() {
            if (keyWord) {
                try {
                    setLoader(true)
                    const data = await fetch(keyWord, page)
                    setTotalPages(0)
                    setError(false)
                    setLoader(false)
                    // лишив перевірку для запуску таймауту
                    page > 1 && setTimeout(() => {
                        scroll()
                         },100)
                    setImgs(prevImgs => [...prevImgs, ...data.results])
                    setTotalPages(data.total_pages)
                } catch (error) {
                    setLoader(false)
                    setError(true)
                    }
                } 
        }
        onFetch()
    }, [keyWord, page])
    
    
    function openModal(data) {
        setIsOpen(true);
        setDataModal(data)
        
    }

  function closeModal() {
    setIsOpen(false);
  }
    
    function scroll() {
    imgRef.current?.childNodes?.[0] && window.scrollBy({
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
            {modalIsOpen && <ImageModal
                info={dataModal}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            ></ImageModal>}
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