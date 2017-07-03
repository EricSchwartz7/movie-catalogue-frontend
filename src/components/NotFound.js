import React from 'react'
import MoviesList from './MoviesList'

const NotFound = (props) => {
  return (
    <div>
      <p>
        We couldn't find any movies based on your search, but here are some of our most recent selections:
      </p>
      <MoviesList movies={props.allMovies} onClick={props.onClick}/>
    </div>
  )
}

export default NotFound;
