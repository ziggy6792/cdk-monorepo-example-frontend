const env = process.env.REACT_APP_ENV;
const isProd = process.env.REACT_APP_ENV === 'prod';
const title = `MonoRepo ${!isProd ? `(${process.env.REACT_APP_ENV})` : ''}`;

const envConfig = {
  env,
  isProd,
  title,
};

export default envConfig;
