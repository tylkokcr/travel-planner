// middleware/auth.js
exports.requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        req.session.error = 'You must be logged in to access this page';
        return res.redirect('/login');
    }
    next();
};

exports.redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    next();
};