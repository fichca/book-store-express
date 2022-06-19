const express = require('express')
const BookService = require('../service/BookService');
const fileMulter = require('../middleware/file')
const path = require('node:path');

const bookService = new BookService();

const router = express.Router()

router.get("", (req, res) => {
    bookService.getAll()
        .then(books => {
            res.render('books/index', {
                title: "Books",
                books: books
            });
        })
})

router.get("/book/:id", (req, res) => {
    const {id} = req.params
    bookService.getById(id)
        .then(book => {
            res.render('books/view', {
                title: `Book ${book.title}`,
                book: book
            });
        })
        .catch(() => {
            res.render('errors/error', {
                title: 'Book not found: 404'
            })
        })
})

router.get("/create", (req, res) => {
    res.render('books/create', {
        title: "Create",
        book: {}
    });
})

router.post("/create", fileMulter.single('upload'), (req, res) => {
    try {
        const {title, description, authors, favorite, fileCover} = req.body;
        const {originalname, path, filename} = req.file
        bookService.create(filename, title, description, authors, favorite, fileCover, originalname, path)
            .then(book => {
                res.render('books/view', {
                    title: `Book ${book.title}`,
                    book: book
                });
            })
            .catch(() => {
                res.render('errors/error', {
                    title: 'Error description. Bad request: 400'
                })
            })
    } catch (e) {
        res.render('errors/error', {
            title: 'Error file. Bad request: 400'
        })
    }
})

router.get("/update/:id", (req, res) => {
    const {id} = req.params
    bookService.getById(id)
        .then(book => {
            res.render('books/update', {
                title: `Update ${book.title}`,
                book: book
            });
        })
        .catch(() => {
            res.render('errors/error', {
                title: 'Book not found: 404'
            })
        })
})

router.post("/update/:id", (req, res) => {
    const {id} = req.params
    const {title, description, authors, favorite, fileCover} = req.body;
    bookService.update(title, description, authors, favorite, fileCover, id)
        .then(book => {
            res.render('books/view', {
                title: `Book ${book.title}`,
                book: book
            });
        })
        .catch(() => {
            res.render('errors/error', {
                title: 'Book not found: 404'
            })
        });
})

router.get("/download/:id", (req, res) => {
    const {id} = req.params
    bookService.getById(id)
        .then(book => {
            res.status(200);
            res.sendFile(path.join(__dirname, '..', book.fileBook))
        })
        .catch(() => {
            res.status(404);
            res.send();
        })
})

router.post("/delete/:id", (req, res) => {
    const {id} = req.params;
    bookService.delete(id)
        .then(() => bookService.getAll())
        .then(all => {
            res.render('books/index', {
                title: "Books",
                books: all
            });
        });
})
module.exports = router;