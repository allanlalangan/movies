import React, { useState, useCallback } from 'react'

import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  const fetchMovies = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetch('https://swapi.dev/api/films/')

      if (!response.ok) {
        throw new Error('Network Error')
      }

      const data = await response.json()

      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(transformedData)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }, [])

  return (
    <React.Fragment>
      <section>
        <AddMovie />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading === null && <p>Search movies</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading === false && movies.length === 0 && !error && (
          <p>Movies not found</p>
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  )
}

export default App
