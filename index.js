const express = require('express');
const {port} = require('./config/config')
const errorMiddleware = require('./middleware/error');

const mvcIndexRouter = require('./routes/mvc/index')
const mvcBookRouter = require('./routes/mvc/books')

const restAuthorizationRouter = require('./routes/rest/authorization')
const restBookRouter = require('./routes/rest/books')

const app = express()
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', mvcIndexRouter)
app.use('/books', mvcBookRouter);

app.use('/api/books', restBookRouter);
app.use('/api/user', restAuthorizationRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Start on port ${port}`);
})