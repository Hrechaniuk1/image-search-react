import css from './Loader.module.css'

import { BallTriangle } from 'react-loader-spinner'

export default function Loader() {

         return (   <BallTriangle
            height={100}
  color="#blueviolet"
  ariaLabel="ball-triangle-loading"
  wrapperClass={css.loader}
            ></BallTriangle>
         )
  
}
