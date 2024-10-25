require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
app.set('view engine', 'hbs');
const port = process.env.PORT


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }); 
const db = mongoose.connection; 

const session = require('express-session'); 
const User = require('./models/User')
const MongoStore = require('connect-mongo') 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
app.use(session({
    secret: 'abcd1234', 
    resave: false, 
    saveUninitialized: false, 
    store: new MongoStore({ mongoUrl: process.env.MONGO_DB_URL}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week (adjust as needed)
    },
}));


const passport = require('passport'); // Import Passport.js library for authentication
const LocalStrategy = require('passport-local').Strategy; // Import Passport Local Strategy for username/password authentication
app.use(passport.initialize()); // Initialize Passport middleware
app.use(passport.session()); // Use Passport middleware for session management
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user data for storage in session
passport.deserializeUser(User.deserializeUser()); // Deserialize user data from session

const path = require('path'); // Import path module
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const Movie = require('./models/movie')


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const dashboard = require('./routes/dashboard')
const addMovie = require('./routes/addMovie')
const updateMovieRoute = require('./routes/updateMovie')
const deleteMovie = require('./routes/deleteMovie')
const getMovies = require('./routes/getMovies')
const authRoutes = require('./routes/authRoutes')
const myList = require('./routes/mylist')
const watcheMovie = require('./routes/watchedMovie')
const scanAllMovies = require('./routes/scanAllMovies')

const addShows = require('./routes/addShows')
const updateShows = require('./routes/updateShows')
const deleteShow = require('./routes/deleteShow')
const scanAllShows = require('./routes/scanAllShows')
const getShows = require('./routes/getShows')
const watchedShows = require('./routes/watchedShows')
const showsMylist = require('./routes/showsMylist')
const managePosters = require('./routes/managePosters')
const checkCon = require('./routes/checkcon')

app.use('/', checkCon)
app.use('/', dashboard)
app.use('/', addMovie)
app.use('/', updateMovieRoute)
app.use('/', deleteMovie)
app.use('/', getMovies)
app.use('/', authRoutes)
app.use('/', myList)
app.use('/', watcheMovie)
app.use('/', scanAllMovies)

app.use('/', addShows)
app.use('/', updateShows)
app.use('/', deleteShow)
app.use('/', scanAllShows)
app.use('/', getShows)
app.use('/', watchedShows)
app.use('/', showsMylist)
app.use('/', managePosters)



app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})