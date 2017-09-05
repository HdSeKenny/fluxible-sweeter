import config from '../configs';

export default {
  isSecure: config.supported_modes === 'secure',
  isNSecure: config.supported_modes === 'publicNSecure',
  isPublic: config.supported_modes === 'public',
  isNotPublic: ['secure', 'publicNSecure'].includes(config.supported_modes)
};
