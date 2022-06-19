const Book = require('../model/Book');
const fs = require('fs')

class BookService {

    getAll() {
        return new Promise((resolve) => {
            resolve(books)
        });
    }

    existById(id) {
        if (books.length === 0) {
            return false;
        }
        let idx = books.findIndex(book => book.getId() === id);
        return idx !== -1;
    }

    getById(id) {
        return new Promise(async (resolve, reject) => {
            if (this.existById(id)) {
                resolve(await getById(id));
            } else {
                reject("Not found");
            }
        });
    }

    create(id, title, description, authors, favorite, fileCover, fileName, fileBook) {
        return new Promise((resolve, reject) => {
                if (validate(id, title, description, authors, favorite, fileCover, fileName, fileBook)) {
                    let newBook = new Book(id, title, description, authors, favorite, fileCover, fileName, fileBook);
                    books.push(newBook);
                    resolve(newBook)
                } else {
                    deleteBookFile(fileBook);
                    reject("Validate error.");

                }
            }
        )
    }

    update(title, description, authors, favorite, fileCover, id) {
        return new Promise(async (resolve, reject) => {
            if (this.existById(id)) {
                let book = await getById(id);
                if (title !== undefined) {
                    book.setTitle(title);
                }
                if (description !== undefined) {
                    book.setDescription(description);
                }
                if (authors !== undefined) {
                    book.setAuthors(authors);
                }
                if (favorite !== undefined) {
                    book.setFavorite(favorite);
                }
                if (fileCover !== undefined) {
                    book.setFileCover(fileCover);
                }
                resolve(book);
            } else {
                reject("Not found");
            }
        });
    }

    async delete(id) {
        let idx = books.findIndex(book => book.getId() === id);
        if (idx !== -1) {
            let {fileBook} = books[idx]
            deleteBookFile(fileBook);
            books.splice(idx, 1);
        }
    }
}

async function getById(id) {
    let idx = books.findIndex(book => book.getId() === id);
    return books[idx];
}

function validate(id, title, description, authors, favorite, fileCover, fileName, fileBook) {
    if (id === undefined || title === undefined || description === undefined || authors === undefined || favorite === undefined || fileCover === undefined || fileName === undefined || fileBook === undefined) {
        return false
    }
    return !(id === '' || title === '' || description === '' || authors === '' || favorite === '' || fileCover === '' || fileName === '' || fileBook === '');
}

async function deleteBookFile(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
        }
    });
}

const books = [];

module.exports = BookService;