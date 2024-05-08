import { forwardRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';



const ImageGallery = forwardRef(function ImageGalleryComponent({ data, openModal }, ref) {
   return (<ul ref={ref} className={css.imgList}>
        {data.map(item => (
            <li key={item.id} className={css.imgItem}>
                <ImageCard
                    url={item.urls.small}
                    name={item.urls.alt_description}
                    fullInfo={item}
                    openModal={openModal}
                />
            </li>
        ))}
    </ul>)
});

export default ImageGallery;