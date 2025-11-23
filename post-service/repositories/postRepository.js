const db = require("../config/db");

const postRepository = {
  create: async (title, authorId, subredditId, description) => {
    const query = `
      INSERT INTO posts (title, author_id, subreddit_id, description)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, author_id, subreddit_id, description, created_at
    `;
    const { rows } = await db.query(query, [
      title,
      authorId,
      subredditId,
      description,
    ]);
    return rows[0];
  },

  findByIdWithDetails: async (id) => {
    const query = `
      SELECT P.id, P.title, A.username AS author_name, P.description, S.name AS subreddit_name, P.likes
      FROM posts P
      JOIN users A ON P.author_id = A.id  -- تصحيح: P.author_id بدلاً من P.author
      JOIN subreddits S ON P.subreddit_id = S.id
      WHERE P.id = $1
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
  findById: async (id) => {
    const query = `
      SELECT id, title, description
      FROM posts
      WHERE id = $1
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
  updatePost
};

module.exports = postRepository;
