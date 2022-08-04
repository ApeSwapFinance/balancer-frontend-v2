const ENV = process.env.VUE_APP_ENV || 'development';

const IS_DEV = ENV === 'development';
const IS_STAGING = ENV === 'staging';
const IS_PROD = ENV === 'production';

const USE_DUMMY = Boolean(process.env.VUE_APP_DUMMY) || false;
if (USE_DUMMY) {
  console.log(`USE_DUMMY configuration.`);
}

export { ENV, IS_DEV, IS_PROD, IS_STAGING, USE_DUMMY };
