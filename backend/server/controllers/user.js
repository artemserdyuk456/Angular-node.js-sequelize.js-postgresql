// const Sequelize = require('sequelize');
const User = require('../models').Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const checkAuth = require('../middleware/check-auth');


module.exports = {
    signUp(req, res, next) {
        const url = req.protocol + '://' + req.get("host");
        bcrypt.hash(req.body.password, 10)
            .then(hash => {

                return User
                    .create({
                        // gender: 'male',
                        // lookingFor: 'female',
                        // between: '18-25',
                        // location: 'NY',
                        //
                        // userName: 'Nick',
                        // email: 'test@gmail.com',
                        // password: '123',
                        // dateDay: 'monday',
                        // dateMonth: 'july',
                        // dateYear: '1991',
                        // education: 'high',
                        // children: 'no one',
                        // region: 'NY',
                        // district: 'Manh',
                        // role: 'user',

                        gender: req.body.gender,
                        lookingFor: req.body.lookingFor,
                        between: req.body.between,
                        location: req.body.location,


                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        dateDay: req.body.dateDay,
                        dateMonth: req.body.dateMonth,
                        dateYear: req.body.dateYear,
                        education: req.body.education,
                        children: req.body.children,
                        region: req.body.region,
                        district: req.body.district,
                        image: req.body.image

                        //with reg-form + add photo
                        // image: url + "/images/" + req.file.filename
                    })
            })
            .then(user => {
                console.log(user.role);
                res.status(201).json({
                    message: 'User created!',
                    post:
                        {
                         id: user.id,
                         role: user.role,

                         gender: user.gender,
                         lookingFor: user.lookingFor,
                         between: user.between,
                         location: user.location,

                         userName: user.userName,
                         email: user.email,
                         password: user.password,
                         dateDay: user.dateDay,
                         dateMonth: user.dateMonth,
                         dateYear: user.dateYear,
                         education: user.education,
                         children: user.children,
                         region: user.region,
                         district: user.district,
                         image: user.image,


                    }
                });
            })
            .catch( error => {
                res.status(400).json({
                    message: 'This email or user name is already in use!'
                })
            });
    },

    login(req, res, next) {
        let fetchUser;
        return User
            .findOne({ where: {email: req.body.email} })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message:"Incorrect username or password"
                    })
                }
                fetchUser = user;
                return bcrypt.compare(req.body.password, user.password);
            })
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        message:"Incorrect username or password"
                    })
                }
                const token = jwt.sign(
                    {email: fetchUser.email, id: fetchUser.id, role: fetchUser.role},
                    'secret_this_should_be_longer',
                    {expiresIn: "1h"}
                    );

                res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userName: fetchUser.userName,
                    userId: fetchUser.id,
                    userRole: fetchUser.role
                })
            })
            .catch(err => {
                res.status(401).json({
                    message:"Auth failed!"
                })
            })
    },

    userList(req, res, next) {
        return User
            .all()
            .then(users => {
                res.status(201).json({
                    message: 'Users fetched successfully!',
                    usersData: users
                });
            })
            .catch(error => res.status(400).send(error));
    },
    getOneUser(req, res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(201).json({
                    message: 'Users fetched successfully!',
                    userData: user,
                });
            })
            .catch(error => res.status(400).send(error));
    },

    setRoleUser(req, res, next) {
        console.log(req.body.role);
        return User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update(
                        // {
                        //     role: req.body.role || user.role
                        // }
                        {role: req.body.role},
                        {fields: ['role']}
                    )
                    .then(result => {
                        console.log(user.role);
                        if (!result) {
                            return res.status(401).json({
                                message: 'Set user role failed!'
                            });
                        } else {
                            res.status(200).json({
                                message: 'Set role successfully!'
                            });
                        }
                    })
            })
    },

    updateUser(req, res, next) {
        const url = req.protocol + '://' + req.get("host");
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                return User
                    .findById(req.params.id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({
                                message: 'User Not Found',
                            });
                        }
                        console.log(req.body.userName);
                        console.log(req.body.email);
                        // const password = bcrypt.compare(req.body.password, user.password);
                        return user
                            .update(
                                {
                                    role: user.role,
                                    gender: req.body.gender,
                                    lookingFor:  req.body.lookingFor,
                                    between:  req.body.between,
                                    location:  req.body.location,

                                    userName:  req.body.userName,
                                    email:  req.body.email,
                                    password:  hash,
                                    dateDay:  req.body.dateDay,
                                    dateMonth:  req.body.dateMonth,
                                    dateYear:  req.body.dateYear,
                                    education:  req.body.education,
                                    children:  req.children,
                                    region:  req.body.region,
                                    district:  req.body.district,
                                    // image:  user.image
                                    image: url + "/images/" + req.file.filename

                                }, {
                                    fields: [
                                        'role',

                                        'gender',
                                        'lookingFor',
                                        'between',
                                        'location',
                                        'userName',
                                        'email',
                                        'password',
                                        'dateDay',
                                        'dateMonth',
                                        'dateYear',
                                        'education',
                                        'children',
                                        'region',
                                        'district',
                                        'image'
                                    ]
                                })
                            .then(result => {
                                if (!result) {
                                    return res.status(401).json({
                                        message: 'Update failed!'
                                    });
                                }
                                res.status(200).json({
                                    message: 'Update successfully!'
                                });

                            })
                    })
                    .catch( error => {
                        res.status(500).json({
                            message: 'Error! Update failed!'
                        })
                    });
            });

    },

    destroy(req, res, next) {
            return User
                .findById(req.params.id)
                .then(user => {
                    if (!user) {
                        return res.status(400).send({
                            message: 'User Not Found',
                        });
                    }
                    return user
                        .destroy()
                        .then(() => res.status(200).send({
                            message: 'User deleted successfully.'
                        }))
                        .catch(error => res.status(400).send(error));
                })
                .catch( error => {
                    res.status(500).json({
                        message: 'User deleted failed!'
                    })
                });
    },
};