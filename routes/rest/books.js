const express = require('express')
const BookService = require('../../service/BookService');
const fileMulter = require('../../middleware/file')
const path = require('node:path');

const bookService = new BookService();

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200);
    bookService.getAll()
        .then(all => {
            res.json(all)
        })
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    bookService.getById(id)
        .then(book => {
            res.status(200);
            res.json(book)
        })
        .catch(() => {
            res.status(404);
            res.send()
        })
})

router.post("/", fileMulter.single('upload'), (req, res) => {
    try {
        const {title, description, authors, favorite, fileCover} = req.body;
        const {originalname, path, filename} = req.file
        bookService.create(filename, title, description, authors, favorite, fileCover, originalname, path)
            .then(book => {
                res.status(200);
                res.json(book);
            })
            .catch(() => {
                res.status(400);
                res.send();
            })
    } catch (e) {
        res.status(400);
        res.send();
    }
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {title, description, authors, favorite, fileCover} = req.body;

    bookService.update(title, description, authors, favorite, fileCover, id)
        .then(book => {
            res.status(200);
            res.json(book);
        })
        .catch(() => {
            res.status(404);
            res.send();
        });
})

router.get("/:id/download", (req, res) => {
    const {id} = req.params
    bookService.getById(id)
        .then(book => {
            res.status(200);
            res.sendFile(path.join(__dirname, '..', '..', book.fileBook))
        })
        .catch(() => {
            res.status(404);
            res.send();
        })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    let promiseDelete = bookService.delete(id);
    res.status(200);
    promiseDelete.then(() => res.send());
})

module.exports = router