import { forwardRef } from 'react';
import { request, gql } from 'graphql-request';
import useSWR from 'swr';

import Song from './song';

const SONGS_QUERY = gql`
  query HomePage($genre: String!) {
    SongsByGenre(genre: $genre) {
      track_id
      track_name
      track_artist
      track_popularity
      track_album_id
      track_album_name
      track_album_release_date
      playlist_name
      playlist_id
      playlist_genre
      playlist_subgenre
      danceability
      energy
      key
      loudness
      mode
      speechiness
      acousticness
      instrumentalness
      liveness
      valence
      tempo
      duration_ms
      album_cover_art_url
    }
  }
`;

const fetcher = genre =>
  request('http://localhost:3000/api/graphql', SONGS_QUERY, {
    genre
  });

const Genre = forwardRef(({ genre }, ref) => {
  const { data, error } = useSWR([genre], fetcher);

  if (!data && !error)
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) {
    console.error(error);
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="alert alert-danger" role="alert">
          Something bad happened!
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-capitalize py-5" ref={ref}>{genre}</h2>
      {data.SongsByGenre.length ? (
        <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5 g-3">
          {data.SongsByGenre.map(song => (
            <Song key={song.track_id} song={song} />
          ))}
        </div>
      ) : (
        <p className="text-center">No Results!</p>
      )}
    </div>
  );
});

export default Genre;
