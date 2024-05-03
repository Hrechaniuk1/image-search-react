export default function SearchBar({ onFind }) {
    
    function submitHandler(event) {
        event.preventDefault()
        const data = event.target.elements.search.value
        if (data.length === 0) {
            console.log("ah")
            return
        }
        onFind(event.target.elements.search.value)
        event.target.reset()
    }
 
    return (
        <header>
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
</header>
    )
}