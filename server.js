const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const methodOverride = require('method-override')
// nodemon ./server.js localhost 3000

const Books = require('./models/books')


const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://gamefortas:1ONEpiece1@cluster0.4xrlzbw.mongodb.net/book_shop'
let title = "Book Shop"

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .catch((e) => console.log(e));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false}))

app.use(express.static('styles'));

app.use(methodOverride('_method'))


//Find
app.get('/', (req, res) => {
    Books
        .find()
        .sort({book: 1})
        .then((books) => res.render(createPath('books'), { "books":books, "title": title  }))
        .catch((error) => {
            console.log(error);
        })
});

app.post('/', (req, res) => {
    const { id, name, author, isbn, price, amt } = req.body;
  const emails = new Books({id, name, author, isbn, price, amt});
  emails
      .save()
      .then((result) => res.redirect('/'))
});

app.delete('/:id', (req, res) => {
    Books
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
        })
});


// Edit Book
app.get('/editBook/:id', (req, res) => {
    Books
        .findById(req.params.id)
        .then(books => res.render(createPath('editBook'), {books}))
        .catch((error) => {
            console.log(error);
        });
});

app.put('/editBook/:id', (req, res) => {
    const { name, author, isbn, price, amt } = req.body;
    const { id } = req.params;
    Books
        .findByIdAndUpdate(id, {name, author, isbn, price, amt})
        .then(result => res.redirect('/'))
        .catch((error) => {
            console.log(error);
        });
});


// Add Book
app.get('/addBook', (req, res) => {
    Books
        .find()
        .sort({book: 1})
        .then((books) => res.render(createPath('addBook'), { "books":books, "title": title  }))
        .catch((error) => {
            console.log(error);
        })
});

app.post('/addBook', (req, res) => {
    const { id, name, author, isbn, price, amt } = req.body;
  const books = new Books({id, name, author, isbn, price, amt});
  books
      .save()
      .then((result) => res.redirect('/'))
      .catch((error) => {
    console.log(error);
  })
});