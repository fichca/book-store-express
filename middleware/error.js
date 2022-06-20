module.exports = ((req, res) => {
    res.render('errors/error', {
        title: 'Page not found: 404'
    })
});