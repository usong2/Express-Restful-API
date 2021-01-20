var express = require('express');
var router = express.Router();
const userController = require('../controllers');

// router.get('/user', userController.getUser);
// router.post('/user', userController.postUser);
router.get('/', userController.getHome);
router.get('/list', userController.getList);
router.get('/getUSer/:username', userController.getUser);
router.post('/postUser/:username', userController.postUser);
router.put('/putUser/:username', userController.putUser);
router.delete('/deleteUser/:username', userController.deleteUser);

module.exports = router;