const env = window.env.ENV;
const isProd = window.env.ENV === 'prod';
const isStaging = window.env.ENV === 'staging';
const isDev = window.env.ENV === 'dev';
const title = `MonoRepo ${!isProd ? `(${window.env.ENV})` : ''}`;

const envConfig = {
    env,
    isProd,
    isStaging,
    isDev,
    title,
};

export default envConfig;
