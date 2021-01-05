const env = process.env.REACT_APP_ENV;
const isProd = process.env.REACT_APP_ENV === 'prod';
const isStaging = process.env.REACT_APP_ENV === 'staging';
const isDev = process.env.REACT_APP_ENV === 'dev';
const title = `MonoRepo ${!isProd ? `(${process.env.REACT_APP_ENV})` : ''}`;

const envConfig = {
  env,
  isProd,
  isStaging,
  isDev,
  title,
};

export default envConfig;
