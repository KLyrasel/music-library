import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [artistData, setArtistData] = useState([])
    const nav = useNavigate()
    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
            console.log(resData)
        }
        fetchData()
    }, [id])

    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    return (
        <div>
            <button onClick={() => nav(-1)}>Back</button>
            |
            <button onClick={() => nav('/')}>Home</button>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <p>Loading...</p>}
            {renderAlbums}
        </div>
    )

}

export default ArtistView