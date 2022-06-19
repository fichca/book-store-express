const express = require('express');
const {port} = require('./config/config')
const bookRouter = require('./routes/books')
const indexRouter = require('./routes/index')
const authorizationRouter = require('./routes/authorization')
const errorMiddleware = require('./middleware/error');

const app = express()
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter)
app.use('/api/books', bookRouter);
app.use('/api/user', authorizationRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Start on port ${port}`);
})