const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();




router.post('/', rejectUnauthenticated, async (req, res) => {  
  console.log('this is bookmark post req.body:', req.body)

  const bookmarkUrl = req.body[0]
  const userId = req.body[1]

  const connection = await pool.connect();

  try {
    await connection.query('BEGIN;')

    const createBookmark = `
    INSERT INTO bookmarks(url)
      SELECT $1
      WHERE NOT EXISTS (SELECT * FROM bookmarks WHERE url = $2 )
      `;
    const createResult = await connection.query( createBookmark, [bookmarkUrl, bookmarkUrl]);

    // const newBookmarkId = createResult.rows[0].id;
    // console.log('new bookmark id', newBookmarkId);

    const createJoinInfo = `
    INSERT INTO user_bookmarks (user_id, bookmark_id)
      SELECT $1, (SELECT "id" FROM bookmarks WHERE url = $2 )
      WHERE NOT EXISTS (SELECT * FROM user_bookmarks WHERE user_id = $1 AND bookmark_id = (SELECT "id" FROM bookmarks WHERE url = $2 ));
    `;
    await connection.query( createJoinInfo, [userId, bookmarkUrl]);

    await connection.query('COMMIT;')
    res.sendStatus(200);

  } catch (err) {
    console.log('Error on add Bookmark:', err);
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  } finally {
    connection.release();
  }

})


router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('this is bookmark GET, user id =',req.params.id)
  const userId = req.params.id;
  const queryText = `
  SELECT bookmarks.url FROM bookmarks
  JOIN user_bookmarks ON bookmarks.id = user_bookmarks.bookmark_id
  WHERE user_id = $1;`
  pool.query( queryText, [userId] )
  .then( (response) => {
      console.log( 'Successfully got bookmark data', response.rows);
      res.send(response.rows);
  })
  .catch( (err) => {
      console.log('An error occured while getting bookmarks:', err);
      res.sendStatus(500);
  })
})


router.put('/', rejectUnauthenticated, (req,res)=> {
  console.log('delete req.body:', req.body)
  // req.user.id --- GET USER ID FROM HERE
  const bookmarkUrl = req.body[0]
  const userId = req.body[1]
  const queryValues = [bookmarkUrl, userId]
  const queryText = `
  DELETE FROM user_bookmarks
  WHERE bookmark_id = ANY(
    SELECT "id" FROM bookmarks
    WHERE url = $1
    )
  AND user_id = $2;
  `
  pool.query(queryText, queryValues)
  .then( (response) =>{
    console.log('bookmark deleted', req.body)
    res.sendStatus(200);
  })
  .catch((err)=>{
    console.log('Error on bookmark delete:', err);
    res.sendStatus(500)
  })
})


module.exports = router;