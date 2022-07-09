class Book {

    constructor(id, title, description, authors, favorite, fileCover, fileName, fileBook, views) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        this.views = views;
    }

    id;
    title;
    description;
    authors;
    favorite;
    fileCover;
    fileName;
    fileBook;
    views;


    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    getTitle() {
        return this.title;
    }

    setTitle(value) {
        this.title = value;
    }

    getDescription() {
        return this.description;
    }

    setDescription(value) {
        this.description = value;
    }

    getAuthors() {
        return this.authors;
    }

    setAuthors(value) {
        this.authors = value;
    }

    getFavorite() {
        return this.favorite;
    }

    setFavorite(value) {
        this.favorite = value;
    }

    getFileCover() {
        return this.fileCover;
    }

    setFileCover(value) {
        this.fileCover = value;
    }

    getFileName() {
        return this.fileName;
    }

    setFileName(value) {
        this.fileName = value;
    }

    getFileBook() {
        return this.fileBook;
    }

    setFileBook(value) {
        this.fileBook = value;
    }

    getViews() {
        return this.views;
    }

    setViews(value) {
        this.views = value;
    }
}


module.exports = Book;