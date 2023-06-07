import React from 'react';

import './App.css';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = React.useState([]);

  const fetchMoviesHandler = () => {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.results.map((movieData: any) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        return setMovies(transformedMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
