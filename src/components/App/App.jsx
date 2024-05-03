import { useState } from "react"

import SearchBar from "../SearchBar/SearchBar"
import Fetch from "../Fetching/Fetch"
import ImageGallery from "../ImageGallery/ImageGallery"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"


export default function App() {

    const [imgs, setImgs] = useState([])
    const [page, setPage] = useState(1)
    const [keyWord, setKeyWord] = useState('')
    const [totalPages, setTotalPages] = useState(0)
    
   async function submitHandler(value) {
       try {
           setImgs([])
           const data = await Fetch(value)
           setKeyWord(value)
           setImgs(data.results)
           setTotalPages(data.total_pages)
           setPage(page+1)
           
       } catch (error) {
           console.log(error)
        }
   }
    
    async function clickHandler() {
        try {
            const data = await Fetch(keyWord, page)
            const results = data.results
            setImgs([...imgs, ...results])
            setPage(page+1)
        } catch (error) {
            console.log(error)
       }
   } 

    return (
        <>
            <SearchBar
            onFind={submitHandler}
            ></SearchBar>
            <ImageGallery
            data={imgs}
            >                
            </ImageGallery>
            {totalPages>page && <LoadMoreBtn
                onLoadMore={clickHandler}
            ></LoadMoreBtn>}
            
        </>
    )
}