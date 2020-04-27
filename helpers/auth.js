module.exports = {
    authenticationMiddleware: function() {
        return (req, res, next) => {
            if (req.isAuthenticated()) return next();

            const error = 'You must login to view this page.'
            req.flash('info', error, '/')
        }
    },
    authenticationAdminMiddleware: function() {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.role == true) return next();

            const error = 'Only admins can do this.'
            req.flash('info', error, '/')
        }
    }
}