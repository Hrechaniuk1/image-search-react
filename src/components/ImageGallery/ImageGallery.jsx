import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

export default function ImageGallery ({data, openModal}) {


    return (
        <ul className={css.imgList}>
    
                {data.map(item => { return <li className={css.imgItem} key={item.id}><ImageCard url={item.urls.small} name={item.urls.alt_description} fullInfo={item} openModal={openModal} ></ImageCard></li>  })}
        </ul>
    )
} 