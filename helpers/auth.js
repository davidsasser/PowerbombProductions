module.exports = {
    authenticationMiddleware: function() {
        return (req, res, next) => {
            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

            if (req.isAuthenticated()) return next();

            const error = 'You must login to view this page.'
            req.flash('info', error, '/')
        }
    }
}