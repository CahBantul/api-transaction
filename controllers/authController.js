const bcrypt = require('bcrypt');
const { OAuthTokens, OAuthClients, OAuthUsers } = require('../models');

module.exports = {
  getAccessToken: (bearerToken) => {
    return OAuthTokens.findOne({
      where: { accessToken: bearerToken },
      include: [
        { model: OAuthClients, as: 'client' },
        { model: OAuthUsers, as: 'user' },
      ],
    })
      .then((token) => {
        const data = new Object();
        for (const prop in token.get()) data[prop] = token[prop];
        data.client = data.client.get();
        data.user = data.user.get();

        return data;
      })
      .catch((error) => console.log(error));
  },

  getClient: (clientId, clientSecret) => {
    return OAuthClients.findOne({
      where: { clientId, clientSecret },
      raw: true,
    });
  },

  getRefreshToken: (refreshToken) => {
    return OAuthTokens.findOne({
      where: { refreshToken },
      include: [
        { model: OAuthClients, as: 'client' },
        { model: OAuthUsers, as: 'user' },
      ],
    })
      .then((token) => {
        const data = new Object();
        for (const prop in token.get()) data[prop] = token[prop];
        data.client = data.client.get();
        data.user = data.user.get();

        return data;
      })
      .catch((error) => console.log(error));
  },

  getUser: (username, password) => {
    return OAuthUsers.findOne({
      where: { username },
    }).then((user) => {
      const isMatch = bcrypt.compareSync(password, user.get().password);
      if (isMatch) {
        return user.get();
      } else {
        console.log(`password not match`);
      }
    });
  },

  saveToken: (token, client, user) => {
    return OAuthTokens.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.id,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: user.id,
    })
      .then((token) => {
        const data = new Object();
        for (const prop in token.get()) data[prop] = token[prop];
        data.client = data.clientId;
        data.user = data.userId;

        return data;
      })
      .catch((error) => console.log(error));
  },

  revokeToken: (token) => {
    return OAuthTokens.findOne({
      where: { refreshToken: token.refreshToken },
    })
      .then((refreshToken) => {
        return refreshToken
          .destroy()
          .then(() => {
            return !!refreshToken;
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },

  setClient: (client) => {
    return OAuthClients.create({
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      redirectUris: client.redirectUris,
      grants: client.grants,
    })
      .then((client) => {
        client = client && typeof client == 'object' ? client.toJSON() : client;
        const data = new Object();
        for (const prop in client) data[prop] = client[prop];
        data.client = data.clientId;
        data.grants = data.grants;

        return data;
      })
      .catch((error) => console.log(error));
  },

  setUser: (user) => {
    return OAuthUsers.create({
      username: user.username,
      password: user.password,
    })
      .then((userResult) => {
        userResult =
          userResult && typeof userResult == 'object'
            ? userResult.toJSON()
            : userResult;
        const data = new Object();
        for (const prop in userResult) data[prop] = userResult[prop];
        data.client = data.clientId;
        data.grants = data.grants;

        return data;
      })
      .catch((error) => console.log(error));
  },
};
