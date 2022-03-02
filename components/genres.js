import { useState, createRef, forwardRef } from 'react';
import Genre from './genre';

const GENRES = ['rap', 'pop', 'edm', 'r&b', 'rock', 'latin'];

const GenreNavButton = ({ isSelected, genre, onClick }) => 
  <button
    type="button"
    className={`text-capitalize m-2 btn btn-${isSelected ? 'primary' : 'light'}`}
    style={{ width: `${Math.floor(85 / GENRES.length)}%` }}
    onClick={onClick}
  >
    {genre}
  </button>;

export default function Genres() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const genreRefs = {};

  const createGenreSection = (genre) => {
    genreRefs[genre] = createRef();
    return <Genre ref={genreRefs[genre]} key={genre} genre={genre} />;
  };
  const scrollToGenre = (genre) => genreRefs[genre].current.scrollIntoView();

  return (
    <>
      <div className="sticky-top p-2 bg-light">
        {GENRES.map(genre => (
          <GenreNavButton key={genre} genre={genre} isSelected={genre === selectedGenre} onClick={() => { scrollToGenre(genre); setSelectedGenre(genre); }} />
        ))}
      </div>

      {GENRES.map(genre => createGenreSection(genre))}
    </>
  );
}
