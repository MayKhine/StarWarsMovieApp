import React, { useCallback, useEffect, useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetch("https://swapi.dev/api/films")

      if (!response.ok) {
        throw new Error("Something went wrong!")
      }

      const data = await response.json()

      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.releaseDate,
        }
      })
      setMovies(transformedData)
    } catch (error) {
      console.log("ERROR happened")
      setError(error.message)
    }
    setIsLoading(false)
  })

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  let content = <p>Found no movies</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && content}
        {!isLoading && movies.length === 0 && !error && content}
        {!isLoading && error && content}

        {isLoading && content}
      </section>
    </React.Fragment>
  )
}

export default App
