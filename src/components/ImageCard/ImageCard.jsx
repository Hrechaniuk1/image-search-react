
export default function ImageCard({ url, name, fullInfo, openModal }) {

    function clickHandler() {
        openModal(fullInfo)
    }

    return (
        <> 
            <img onClick={clickHandler} src={url} alt={name} />
        </>
    )
}