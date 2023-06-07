import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props: any) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie: any) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
