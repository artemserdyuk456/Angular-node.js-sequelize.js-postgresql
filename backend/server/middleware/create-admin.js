const User = require('../models').Users;
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    bcrypt.hash('1234', 10)
        .then(hash => {
            return User.findOne({where:{role: 'Administrator'}})
                .then(admin => {
                    if (admin === null) {
                        return User.create({
                            gender: 'male',
                            lookingFor: 'female',
                            between: '18-25',
                            location: 'London',
                            userName: 'Admin',
                            email: 'admin@gmail.com',
                            password: hash,
                            dateDay: '01',
                            dateMonth: 'july',
                            dateYear: '1991',
                            education: 'Primary',
                            children: 'no one',
                            region: 'Hills',
                            district: 'Hills',
                            role: 'Administrator',
                        })
                            // .then( admin => {
                            //     if (admin) {
                            //         res.status(400).json({
                            //             message: 'Create admin successfully! Please try again to complete reg!'
                            //         })
                            //     }
                            // })
                            .then(
                                next()
                            )
                    }
                    else {
                        return next();
                    }
                })
                .catch( err => {
                    res.status(400).json({
                        message: 'Create admin is failed!'
                    })
                })
        });

};

