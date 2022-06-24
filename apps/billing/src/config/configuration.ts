export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3002,
  GOOGLE_CREDENTIALS_KEY: process.env.GOOGLE_CREDENTIALS_KEY,
});
