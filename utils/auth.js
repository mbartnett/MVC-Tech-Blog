// const withAuth = (req, res, next) => {
//     // If the user is not logged in, redirect the request to the login route
//     if (!req.session.loggedIn) {
//         res.redirect('/login');
//     } else {
//         next();
//     }
// };

const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.locals.loggedIn = false;
    } else {
        res.locals.loggedIn = true;
    }
    next();
};

module.exports = withAuth;