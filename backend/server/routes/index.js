const usersController = require('../controllers').users;
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const checkRole = require('../middleware/role-auth');
const createAdmin = require('../middleware/create-admin');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(null, './backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
});
module.exports = (app) => {
    app.post('/api/users', createAdmin, multer({storage: storage}).single('image'), usersController.signUp);
    app.post('/api/user/create/admin', checkAuth, checkRole.admin, usersController.signUp);
    app.post('/api/login', usersController.login);
    app.get('/api/users', usersController.userList);
    app.get('/api/users/:id',checkAuth, usersController.getOneUser);
    app.put('/api/role/:id', checkAuth, checkRole.admin, usersController.setRoleUser);
    app.put('/api/users/:id', checkAuth, checkRole.adminModer, multer({storage: storage}).single('image'), usersController.updateUser);
    app.delete('/api/users/:id', checkAuth, checkRole.admin, usersController.destroy);
};
