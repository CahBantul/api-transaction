const express = require('express');
const router = express.Router();
const OAuthController = require('../controllers/authController');
const OAuthServer = require('express-oauth-server');

router.oauth = new OAuthServer({
  model: OAuthController,
});

router.post('/oauth/token', router.oauth.token());
router.post('/oauth/set_client', (req, res) => {
  OAuthController.setClient(req.body)
    .then((client) => {
      res.json(client);
    })
    .catch((error) => console.log(error));
});
router.post('/oauth/signup', (req, res) => {
  OAuthController.setUser(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => console.log(error));
});

router.get('');

module.exports = router;
