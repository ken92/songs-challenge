const PER_PAGE = 15;

export default {
  Query: {
    async Songs(root, { page, search }, { db }) {
      const offsetStart = PER_PAGE * (page - 1);
      const offsetEnd = offsetStart + PER_PAGE;

      const query = search
        ? `SELECT * FROM songs
      WHERE track_name LIKE "%${search}%"
      OR track_artist LIKE "%${search}%"
      OR track_album_name LIKE "%${search}%"
      ORDER BY track_name ASC
      LIMIT ${PER_PAGE} OFFSET ${offsetStart}`
        : `SELECT * FROM songs
      ORDER BY track_name ASC
      LIMIT ${PER_PAGE} OFFSET ${offsetStart}`;

      const stmt = db.prepare(query);

      const rows = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
      }

      const totalResult = await db.exec(
        search
          ? `SELECT COUNT(*) FROM songs
      WHERE track_name LIKE "%${search}%"
      OR track_artist LIKE "%${search}%"
      OR track_album_name LIKE "%${search}%"`
          : 'SELECT COUNT(*) FROM songs'
      );

      const total = totalResult[0].values[0][0];

      return {
        songs: rows,
        pageInfo: {
          per_page: PER_PAGE,
          current_page: page,
          total: total,
          has_more: offsetEnd < total
        }
      };
    },

    async SongsByGenre(root, { genre }, { db }) {
      const query =
        'SELECT * FROM songs WHERE playlist_genre = $genre ORDER BY random() LIMIT 5';

      const stmt = db.prepare(query);
      stmt.bind({ $genre: genre });

      const rows = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
      }

      return rows;
    }
  }
};
