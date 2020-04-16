module.exports = {
    authenticationMiddleware: function() {
        return (req, res, next) => {
            if (req.isAuthenticated()) return next();

            const error = 'You must login to view this page.'
            req.flash('info', error, '/')
        }
    }
}