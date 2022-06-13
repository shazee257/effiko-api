const apiRouter = require('express').Router();

const courseApi = require('./course');
const articleApi = require('./article');
const categoryApi = require('./category');
const subscriptionApi = require('./subscription');
const advisorApi = require('./advisor');
const messageApi = require('./message');
const interviewApi = require('./interview');
const linkedinApi = require('./linkedin');
const bookApi = require('./book');
const locationApi = require('./location');

apiRouter.use('/courses', courseApi);
apiRouter.use('/articles', articleApi);
apiRouter.use('/categories', categoryApi);
apiRouter.use('/subscriptions', subscriptionApi);
apiRouter.use('/advisors', advisorApi);
apiRouter.use('/messages', messageApi);
apiRouter.use('/interviews', interviewApi);
apiRouter.use('/linkedin', linkedinApi);
apiRouter.use('/books', bookApi);
apiRouter.use('/locations', locationApi);


module.exports = apiRouter;