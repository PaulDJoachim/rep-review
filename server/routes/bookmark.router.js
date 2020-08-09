const express = require('express');

const { default: axios } = require('axios');
const pool = require('../modules/pool');
const router = express.Router();




router.post('/', async (req, res) => {  
  console.log('this is req.body:', req.body)

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


//   const queryText = `
//   BEGIN;
// 	INSERT INTO bookmarks(url)
//    		SELECT ($1)
//     	WHERE NOT EXISTS (SELECT * FROM bookmarks WHERE url = $1 );
// 	INSERT INTO user_bookmarks (user_id, bookmark_id)
// 		SELECT $2 , (SELECT "id" FROM bookmarks WHERE url = $1 )
// 		WHERE NOT EXISTS (SELECT * FROM user_bookmarks WHERE user_id = $2 AND bookmark_id = (SELECT "id" FROM bookmarks WHERE url = $1 ));
//   END
//   `;
//   pool.query(queryText, req.body)
//     .then(() => res.sendStatus(201))
//     .catch((err) => {
//       console.log('Error with adding bookmark:', err);
//       res.sendStatus(500);
//     });
// });

// // Create a new account and deposit an initial balance
// router.post('/', async (req, res) => {
//   console.log(`req.body`, req.body);

//   const name = req.body.name;
//   const amount = req.body.amount;

//   // Get a single connection from the pool to do the transaction
//   // THIS IS IMPORTANT - won't work if you don't use the same connection!
//   const connection = await pool.connect();

//   try {
//     // Start transaction
//     await connection.query('BEGIN;');

//     // Do the meat of stuff ... 
    
//     // Create the account & get back the new ID
//     const createAccount = `INSERT INTO account (name) VALUES ($1) RETURNING id;`;
//     // We care about the result coming out of the database, so save it (need id)
//     const createResult = await connection.query( createAccount, [name]);

//     // Get the id from the query result
//     const newAcctId = createResult.rows[0].id;
//     console.log('new id', newAcctId);

//     const depositStatement = `INSERT INTO register (acct_id, amount) VALUES ($1, $2);`;
//     // We don't care about the result coming back so ignore it.
//     await connection.query( depositStatement, [newAcctId, amount]);

//     // End transaction w/ COMMIT
//     await connection.query('COMMIT;')
//     res.sendStatus(200);

//   } catch (err) {
//     console.log('Error on create account', err);
//     // Transaction failed, so end with ROLLBACK
//     await connection.query('ROLLBACK');
//     res.sendStatus(500);

//   } finally {
//     // THIS IS ALSO REALLY IMPORTANT!!! 
//     // Puts the connection back in the pool to be used again later.
//     // FREE THE CONNECTION IN FINALLY 
//     connection.release();
//   }
// })




module.exports = router;