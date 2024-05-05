import { useState } from "react"

import SearchBar from "../SearchBar/SearchBar"
import Fetch from "../Fetching/Fetch"
import ImageGallery from "../ImageGallery/ImageGallery"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import Loader from "../Loader/Loader"
import ImageModal from "../ImageModal/ImageModal"


export default function App() {

    const [imgs, setImgs] = useState([])
    const [page, setPage] = useState(1)
    const [keyWord, setKeyWord] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

    
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
        } catch (error) {
            setError(true)
       }
   } 

    function openModal(data) {
        setIsOpenModal(true)
        setDataModal(data)
    }
    function closeModal() {
        setIsOpenModal(false)
        setDataModal({})
    }

    function closeModalByBtn(event) {
        window.addEventListener('keydown', closeModalByBtn)
        if (event.keyCode === 27) {
            setIsOpenModal(false)
            setDataModal({})
            window.removeEventListener('keydown', closeModalByBtn)
        }
    }
    
    return (
        <>
            <SearchBar
            onFind={submitHandler}
            ></SearchBar>
            {isOpenModal && <ImageModal
                info={dataModal}
                closeModal={closeModal}
                CloseByBtn={closeModalByBtn}
            >
            </ImageModal>}
            {error && <p>Oops, something went wrong</p>}
            {loader && <Loader></Loader>}
            <ImageGallery
                data={imgs}
                openModal={openModal}
            >                
            </ImageGallery>
            {totalPages>page && <LoadMoreBtn
                onLoadMore={clickHandler}
            ></LoadMoreBtn>}
            
        </>
    )
}