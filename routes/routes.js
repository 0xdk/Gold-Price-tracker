
require('dotenv').config();

let express = require('express');
let router = express.Router();
const AppError = require('../utils/AppError');

const controller = require('../controller/routeCtrl');
const routeMiddleware = require('../middleware/routeSecureMiddleware');

const { body } = require('express-validator');

// Middleware to set local variables for success and error flash messages
router.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
router.get('/', controller.homeRoute);

router.post(
  '/signup',
  body('email').isEmail().withMessage('Please enter a valid email sucka'),
  controller.signup
);

router.get(
  '/get-data',
  routeMiddleware.secureRouteMiddleware,
  controller.scrapeAndStoreGoldPrice
);

router.get(
  '/send-mail',
  routeMiddleware.secureRouteMiddleware,
  controller.mailSending
);

router.all('*', (req, res, next) => {
  next(new AppError('Page not found from here *', 404));
});

module.exports = router;
