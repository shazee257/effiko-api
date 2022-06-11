const apiRouter = require('express').Router();

const courseApi = require('./course');
const articleApi = require('./article');
const categoryApi = require('./category');
const subscriptionApi = require('./subscription');


apiRouter.use('/courses', courseApi);
apiRouter.use('/articles', articleApi);
apiRouter.use('/categories', categoryApi);
apiRouter.use('/subscriptions', subscriptionApi);


module.exports = apiRouter;