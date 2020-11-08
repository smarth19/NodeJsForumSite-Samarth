const jwt = require('jsonwebtoken')
const session = require('express-session')

function authenticateUser(req, res, next) {
    if (req.session.loginToken != undefined) {
        try {
            let decode = jwt.verify(req.session.loginToken, ';M.4]?4%v/k9={6g')
            res.locals.decoded = decode
            res.locals.authenticated = true
        } catch {
            console.log('error occurred while verifying jwt token');
            req.authenticated = false
        }
    }
    next()
}

module.exports = authenticateUser
