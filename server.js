const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const methodOverride = require('method-override')
// nodemon ./server.js localhost 3000

const Books = require('./models/books')


const app = express();

app.use('/static/frontend', express.static(path.join(__dirname, 'views/static')));
app.set('views', path.join(__dirname, 'views/templates'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const PORT = 3000;
const db = 'mongodb+srv://gamefortas:1ONEpiece1@cluster0.4xrlzbw.mongodb.net/book_shop'
let title = "Book Shop"

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .catch((e) => console.log(e));

const createPath = (page) => path.resolve(__dirname, 'frontend', `${page}.html`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }))

app.use(express.static('styles'));

app.use(methodOverride('_method'))

app.use(express.json());


app.post('/api/find', (req, res) => {
    Books
        .find(req.body)
        .sort({ book: 1 })
        .lean()
        .exec(function (err, books) {
            if (err){
                return res.status(500).send({"error": err})
            }
            return res.status(200).send(JSON.stringify(books));
        })
});

app.delete('/api/delete/', (req, res) => {
    Books
        .deleteMany(req.query)
        .exec(function (err, books) {
            if (err){
                return res.status(500).send({"error": err})
            }
            return res.status(200).send(JSON.stringify(books));
        })
});



app.put('/api/editBook/', (req, res) => {
    Books
        .findOneAndUpdate({"isbn": req.query.isbn}, req.query)
        .exec(function (err, books) {
            if (err){
                return res.status(500).send({"error": err})
            }
            return res.status(200).send(JSON.stringify(books));
        })
});



app.post('/api/addBook', (req, res) => {
    Books.find({ "isbn": req.query.isbn }, function (err, results) {
        if (err) { return res.status(500).send({"error": err}) }
        if (!results.length) {
            const book = new Books(req.query);
            book.save()
            return res.status(200).send(book.toJSON());

        }else{
            return res.status(400).send({"error": "There is no book with this isbn"})
        }
    });
});

// Frontend

const frontendPages = [
    '/',
    "/addBook",
    "/editBook/:isbn"
];



frontendPages.forEach((path) => {
    app.get(path, (req, res) => {
      res.render('index.html');
    });
  });
