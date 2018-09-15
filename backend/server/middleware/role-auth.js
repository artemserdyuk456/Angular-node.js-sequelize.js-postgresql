module.exports = {
    admin(req, res, next) {
        const role = req.userData.role;
        if (role === 'Administrator') {
            return next();
        } else {
            return res.status(401).json({
                message: 'You don`t have access rights to do this!'
            })
        }
    },
    adminModer(req, res, next) {
        const role = req.userData.role;
        const userId = req.userData.id;
        const idProfile = req.params.id;

        console.log(role);
        console.log(userId);
        console.log(idProfile);
        if ((userId == idProfile && role === 'Moderator') || role === 'Administrator') {
            return next();
        } else {
            return res.status(401).json({
                message: 'You don`t have access rights to do this!'
            })
        }

    }
};

