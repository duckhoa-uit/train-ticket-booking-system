const config = {
  redisCacheExpiresIn: 60,
  auth: {
    refreshTokenExpiresIn: 60 * 24 * 30,
    accessTokenExpiresIn: 60 * 24 * 7,
  },
};

export default config;
