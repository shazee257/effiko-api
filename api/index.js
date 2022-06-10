const apiRouter = require('express').Router();

const userApi = require('./user');
const sellerApi = require('./seller');
const categoryApi = require('./category');
const brandApi = require('./brand');
// const productApi = require('./product');


apiRouter.use('/users', userApi);
apiRouter.use('/sellers', sellerApi);
apiRouter.use('/categories', categoryApi);
apiRouter.use('/brands', brandApi);
// apiRouter.use(productApi);


module.exports = apiRouter;