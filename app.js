require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const connectDB =  require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');



const app = express();
const port = process.env.PORT || 5000;


app.use(session({
    secret: 'keyboard cat',
    resave : false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    // cookie: {maxAge : new Date(Date.now() + (3600000))}
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


app.use(express.urlencoded({extended : true}));
app.use(express.json());


//connect to database
connectDB();

//Static files
app.use(express.static('public'));

//Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Routes
app.use('/', require('./server/routes/auth'))
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'))


//Error page (handle 404)
app.get('*', (req,res) => {
    const locals = {
        title: '404: Not found',
        description : 'This page does not exist'
    }
    res.status(404).render('404', {locals : locals});
})






app.listen(port , () => {
    console.log(`server is listening on port ${port}`);
});

