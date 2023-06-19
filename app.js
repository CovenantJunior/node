const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const env = require('dotenv').config();
const _e = env.parsed;
// Connect to DB
const db = _e.DB;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => app.listen(_e.PORT))
    .catch((err) => console.log(err));

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

//Test
// app.use((req, res, next) => {
//     console.log("Request made...")
//     console.log("Req host: ", req.hostname);
//     console.log("Req path: ", req.path);
//     console.log("Req method: ", req.method);
//     next();
// });

app.use(express.static('static'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.send('<nav><a href="home">Home</a><br><a href="about">About</a><br><a href="404">404</a></nav>');
    // const blogs = [
    //     {'id' : 1,'title' : 'Blog Title ', 'snippet' :  'Do in aute nisi magna cillum tempor qui id in. Excepteur voluptate ut reprehenderit cupidatat Lorem est Lorem pariatur et duis ullamco deserunt commodo eiusmod. Quis aliqua aliquip duis aliquip consequat enim sint. Aute sunt mollit officia cupidatat velit. Proident in duis exercitation irure aliqua ex.'},
    //     {'id' : 2,'title' : 'Blog Title ', 'snippet' :  'Nisi consectetur sint ea magna sunt. Aute cupidatat irure dolore fugiat occaecat exercitation qui fugiat exercitation reprehenderit et. Aliquip proident proident Lorem duis sunt. Tempor Lorem exercitation aute in excepteur. Sunt adipisicing aute et cupidatat veniam sint aliquip ea magna velit duis laborum anim. Occaecat sunt velit esse ex.'},
    //     {'id' : 3,'title' : 'Blog Title ', 'snippet' : 'Aliqua esse fugiat nulla quis occaecat. Sunt cillum magna eiusmod quis. Laborum cupidatat ex occaecat elit. Do dolor proident incididunt anim voluptate proident eu culpa cillum mollit velit in. Quis aute incididunt commodo eiusmod aute esse laboris velit aliquip aliquip non. Adipisicing id deserunt elit elit. Incididunt dolore cupidatat dolore id.'}
    // ]
    // res.render('index', {title: "My Nodejs Course", blogs});
    Blog.find({}).sort({_id:-1})
    .then((result) => {
        res.render('index', {title: "Node is Great", blogs : result});
    })
    .catch((error) => console.log("Error :"+error));
});

app.get('/home', (req, res) => {
    // res.sendFile("views/home.html", {root: __dirname});
    res.render('home', {title: "My Nodejs Course"});
});

app.get('/404', (req, res) => {
    // res.sendFile("views/404.html", {root: __dirname});
    res.render('404', {title: 'Page not found'});
});

app.get('/about', (req, res) => {
    // res.sendFile("views/about.html", {root: __dirname});
    res.render('about', { title: 'About Tea'});
});

// Redirect
app.get('/about-us', (req, res) => {
    res.redirect('about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});

app.get('/blogs/add-blog', (req, res) => {
    const blog = new Blog({
        title: "Article 2",
        snippet: "My very first Blog",
        body: "Duis adipisicing consectetur ullamco ea enim est. Incididunt pariatur labore mollit nisi dolore sint voluptate voluptate mollit adipisicing proident. Consequat amet irure duis sint mollit nisi incididunt esse voluptate reprehenderit dolor nulla pariatur anim. Incididunt nisi officia cillum proident. Cupidatat labore velit tempor irure id aute culpa sunt laborum eu dolor proident elit consequat. Incididunt anim ex mollit est quis."
    });

    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => console.log("Error :"+error));
});

app.post('/blogs/add-blog', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        // res.send(result);
        res.redirect('/');
    })
    // .catch((error) => console.log("Error :"+error));
});

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const blog = Blog.findById(id)
    .then((result) => {
        res.render('details', {title : result.title, snippet : result.snippet, body : result.body});
        // console.log(result);
    })
    .catch((error) => console.log("Error :"+error));
});

app.get('/blogs/all-blog', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => console.log("Error :"+error));
});

app.get('/blogs/single-blog', (req, res) => {
    const blog = Blog.findById('642e04910d61871bcd408907')
    .then((result) => {
        res.send(result);
    })
    .catch((error) => console.log("Error :"+error));
});

// 404 handler
app.use((req, res) => {
    // res.status(404).sendFile("views/404.html", {root: __dirname});
    // res.render('404', {title: 'Page not found'});
    // res.status(404).render('404');
    res.status(404).render('404', {title: 'Page not found'});
});