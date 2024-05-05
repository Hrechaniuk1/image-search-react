import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css'

export default function SearchBar({ onFind }) {
    
    function submitHandler(event) {
        event.preventDefault()
        const data = event.target.elements.search.value
        if (data.length === 0) {
          toast.error('The field is empty!')
            return
        }
        onFind(event.target.elements.search.value)
        event.target.reset()
    }
 
    return (
        <header className={css.header}>
  <form onSubmit={submitHandler}>
    <input
      type="text"
      autoComplete="off"
      name="search"
      autoFocus
      placeholder="Search images and photos"
    />
    <button type="submit">Search</button>
        </form>
        <Toaster
          position="top-center"
          containerClassName={css.toast}
          toastOptions={
            {style: {color: 'white', backgroundColor: 'blue' } }
          }
        ></Toaster>
</header>
    )
}