import React from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props: any) {
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const openingTextRef = React.useRef<HTMLTextAreaElement | null>(null);
  const releaseDateRef = React.useRef<HTMLInputElement | null>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current?.value,
      openingText: openingTextRef.current?.value,
      releaseDate: releaseDateRef.current?.value,
    };

    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows={5} id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
