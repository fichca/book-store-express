const {Schema, module} = require("mongoose");

const bookScheme = new Schema({
    id: String,
    title: String,
    description: String,
    authors: String,
    favorite: String,
    fileCover: String,
    fileName: String,
    fileBook: File,
    views: Number
});

module.exports = module('Book', bookScheme);

