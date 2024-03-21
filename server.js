const express = require('express');
const app = express();
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const AppError = require('./utils/AppError');
const routes = require('./routes/routes');

// template engine
app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// session
const sessionConfig = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 24 * 60 * 60 * 7,
    maxAge: 1000 * 24 * 60 * 60 * 7,
  },
};

// using session, flash
app.use(session(sessionConfig));
app.use(flash());

app.use('/', routes);

app.use((req, res, next) => {
  const err = new AppError('Page not found', 404);
  next(err);
});

app.use((err, req, res, next) => {
  const { message, status } = err;
  console.error(message);
  res.status(status || 500).render('error', { message, status });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});
