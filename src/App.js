import React, { useEffect, useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for music')
  let [data, setData] = useState([])



  useEffect(() => {
    const API_URL = `https://itunes.apple.com/search?term=`

    if (search) {
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [search])

  const handleSearch = (event, term) => {
    event.preventDefault()
    setSearch(term)
  }

  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>
              {message}
              <SearchBar handleSearch={handleSearch} />
              <Gallery data={data} />
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;