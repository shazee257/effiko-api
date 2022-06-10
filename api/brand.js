const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
const { imageUpload } = require('../utils/utils');

const {
    createBrand, uploadImage, getBrandById, getAllBrands,
    updateBrand, deleteBrand
} = require('../controllers/brand');

router.get('/', isAuth, getAllBrands);
router.get('/:brandId', isAuth, getBrandById);
router.post('/', isAuth, createBrand);
router.post('/upload-image/:brandId', isAuth, imageUpload.single('image'), uploadImage);
router.put('/:brandId', isAuth, updateBrand);
router.delete('/:brandId', isAuth, deleteBrand);


module.exports = router;