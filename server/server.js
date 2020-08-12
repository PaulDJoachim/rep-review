
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const houseRouter = require('./routes/house.router')
const senateRouter = require('./routes/senate.router')
const memberRouter = require('./routes/member.router')
const bioRouter = require('./routes/bio.router')
const bookmarkRouter = require('./routes/bookmark.router')
const committeesRouter = require('./routes/committees.router')
const billsRouter = require('./routes/bills.router')
const votesRouter = require('./routes/votes.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/house', houseRouter);
app.use('/api/senate', senateRouter);
app.use('/api/member', memberRouter);
app.use('/api/bio', bioRouter);
app.use('/api/bookmark', bookmarkRouter);
app.use('/api/committees', committeesRouter);
app.use('/api/bills', billsRouter);
app.use('/api/votes', votesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
