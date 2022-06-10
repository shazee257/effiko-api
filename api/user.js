const router = require('express').Router();
const { isAuth, isSellerAuth } = require('../middlewares/auth');
const { imageUpload } = require('../utils/utils');

const {
    registerUser, loginUser, forgotPassword, resetPassword, newPassword,
    changePassword, getUser, getUsers, deleteUser, deleteUsers, updateUser,
    createAddress, updateAddress, getAddresses, deleteAddress,
    uploadUserImage

} = require('../controllers/user');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:resetToken', resetPassword);
router.post('/new-password/:userId', newPassword);

router.get('/:userId', isAuth, getUser);
router.get('/', isAuth, getUsers);
router.delete('/:userId', isAuth, deleteUser);
router.delete('/', isAuth, deleteUsers);
router.post('/change-password', isAuth, changePassword);
router.put('/:userId', isAuth, updateUser);

router.post('/address', isAuth, createAddress);
router.put('/address/:addressId', isAuth, updateAddress);
router.get('/address/:userId', isAuth, getAddresses);
router.delete('/address/:addressId', isAuth, deleteAddress);
router.post('/upload-image', isAuth, imageUpload.single('image'), uploadUserImage);


module.exports = router;