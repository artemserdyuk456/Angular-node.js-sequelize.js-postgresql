const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
        req.userData = {
            email: decodedToken.email,
            id: decodedToken.id, role:
            decodedToken.role
        };
        next();
    } catch (err) {
       res.status(401).json({
           message: 'You are not authenticated!'
       })
    }

};






// {
//     "development": {
//     "username": "users",
//         "password": "1234",
//         "database": "pg_user",
//         "host": "127.0.0.1",
//         "port": 5432,
//         "dialect": "postgres"
// },
//     "test": {
//     "username": "users",
//         "password": "1234",
//         "database": "pg_user",
//         "host": "127.0.0.1",
//         "port": 5432,
//         "dialect": "postgres"
// },
//     "production": {
//     "username": "users",
//         "password": "1234",
//         "database": "pg_user",
//         "host": "127.0.0.1",
//         "port": 5432,
//         "dialect": "postgres"
// }
// }