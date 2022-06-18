const express = require('express');
const {port} = require('./config/config')
const indexRouter = require('./routes/index')

const app = express()
app.use(express.json())
app.use('/public', express.static(__dirname + '/public/books'))

app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`Start on port ${port}`);
})