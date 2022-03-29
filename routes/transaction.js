const express = require('express');
const router = express.Router();
const OAuthController = require('../controllers/authController');
const transactionController = require('../controllers/transactionController');

const OAuthServer = require('express-oauth-server');

router.oauth = new OAuthServer({
  model: OAuthController,
});

router.get('/transactions', transactionController.getAllTransaction);
router.post(
  '/transaction',
  router.oauth.authenticate(),
  transactionController.createTransaction
);
router.put(
  '/transaction/:id',
  router.oauth.authenticate(),
  transactionController.updateTransaction
);
router.delete(
  '/transaction/:id',
  router.oauth.authenticate(),
  transactionController.destroyTransaction
);

module.exports = router;
