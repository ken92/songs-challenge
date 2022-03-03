import { useState, createRef, forwardRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
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
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0]);
  const genreRefs = {};

  const createGenreSection = (genre) => {
    genreRefs[genre] = createRef();
    return (
      <VisibilitySensor
        key={genre}
        onChange={(isVisible) => {
          if (isVisible) setSelectedGenre(genre);
          console.log(`${genre} isVisible: ${isVisible}`);
        }}
      >
        <Genre ref={genreRefs[genre]} genre={genre} />
      </VisibilitySensor>
    );
  };

  const scrollToGenre = (genre) => genreRefs[genre].current.scrollIntoView();

  return (
    <>
      <div className="sticky-top pb-2 px-2 bg-light">
        {GENRES.map(genre => (
          <GenreNavButton key={genre} genre={genre} isSelected={genre === selectedGenre} onClick={() => { scrollToGenre(genre); setSelectedGenre(genre); }} />
        ))}
      </div>

      {GENRES.map(genre => createGenreSection(genre))}
    </>
  );
}
