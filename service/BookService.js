const Book = require('../model/Book');
const BookRepository = require('../model/bookScheme');
const {counterUrl} = require("../config/config");
const axios = require("axios");

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
        const viewsPromise = getCountViews(id);
        return new Promise(async (resolve, reject) => {
            if (this.existById(id)) {
                getById(id)
                    .then(book => {
                        viewsPromise
                            .then(views => {
                                book.setViews(views);
                                resolve(book);
                            })
                    })
            } else {
                reject("Not found");
            }
        });
    }

    create(id, title, description, authors, favorite, fileCover, fileName, fileBook) {
        return new Promise((resolve, reject) => {
                if (validate(id, title, description, authors, favorite, fileCover, fileName, fileBook)) {
                    let newBook = new Book(id, title, description, authors, favorite, fileCover, fileName, fileBook, 0);
                    saveBook(newBook);
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

async function getCountViews(bookId) {
    let url = `${counterUrl}/counter/${bookId}/incr`;
    return axios.post(url)
        .then(resCount => {
            const {count} = resCount.data;
            return count;
        })
        .catch(error => {
            console.log(error)
            return 0;
        });
}

async function saveBook(book) {
    let idx = books.findIndex(book => book.getId() === id);
    return books[idx];
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

module.exports = BookService;