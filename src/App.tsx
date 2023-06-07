import React from 'react';

import './App.css';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

type MovieType = {
  id: string;
  title: string;
  openingText: string;
  releaseDate: string;
};

function App() {
  const [movies, setMovies] = React.useState<Array<MovieType>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchMoviesHandler = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-39eeb-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      );

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie: any) => {
    const response = await fetch(
      'https://react-http-39eeb-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
