require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

hbs.registerHelper('difficiltyNumber2String', value => {
  switch (value) {
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Challenging';
    case 4:
      return 'Hard';
    case 5:
      return 'Very hard';
    default:
      return 'Unknown';
  }
});

hbs.registerHelper('dateOfCreate', value => {
  let valueString = JSON.stringify(value);
  let string = '';
  string = valueString.substring(1, 11);

  return string;
});

hbs.registerHelper('setChecked', (value, category) => {
  if (value == category) {
    console.log(category);
  } else {
    return '';
  }
});



hbs.registerHelper('activePage', (value) => {
  let valueString = JSON.stringify(value)
  let string = ''
  string = valueString.substring(1, 11)

  return string
})

hbs
// default value for title local
app.locals.title = 'Project2';

// Enable authentication using session + passport
app.use(
  session({
    secret: 'irongenerator',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
require('./passport')(app);

app.use((req, res, next) => {
  res.locals.isConnected = !!req.user // truthy => true; falsy => false
  next()
})

app.use((req, res, next) => {
  console.log('aaaaaaaaa' + req.originalUrl)
  console.log("aaaaaaaaaa" + res) // truthy => true; falsy => false
  next()
})

app.use((req, res, next) => {
  console.log('This is my 1st middleware')
  if (req.url === '/') {
    res.locals.activeClass = { home: true }
  }
  if (req.url === '/profile') {
    res.locals.activeClass = { profile: true }
  }
  if (req.url === '/read-stories') {
    res.locals.activeClass = { readStories: true }
  }
  if (req.url === '/new-story') {
    res.locals.activeClass = { newStory: true }
  }
  if (req.url === '/auth/login') {
    res.locals.activeClass = { login: true }
  }
  if (req.url === '/auth/signup') {
    res.locals.activeClass = { signup: true }
  }

  next()
})

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
module.exports = app;
