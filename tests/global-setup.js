/**
 * This file is used for global configuration before running tests.
 * For example, you can configure global authorization via state.json here.
 */
const DEFAULT_BASE_URL = 'https://faceapi.regulaforensics.com/';

module.exports = async () => {
    console.log('Running global setup with environment:', process.env.APP_ENV || 'default');
    console.log('Base URL:', process.env.PLAYWRIGHT_BASE_URL || DEFAULT_BASE_URL);
};
