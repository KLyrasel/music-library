import {useState, useEffect} from 'react'
import { useParams , useNavigate} from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
            console.log(resData)
        }
        fetchData()
    },[id])

    const justSongs = albumData.filter(entry=> entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song,i) => {
        return(
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return(
        <div>
            <button onClick={()=> nav(-1)}>Back</button>
            |
            <button onClick={()=> nav('/')}>Home</button>
            {albumData.length > 0 ? <h2>{albumData[0].collectionCensoredName}</h2> : <p>Loading...</p>}
            {renderSongs}
        </div>
    )
}

export default AlbumView