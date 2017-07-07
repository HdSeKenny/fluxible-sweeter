import crypto from 'crypto';

export default {
  hashCrypto(content) {
    return crypto.createHmac('sha1', this.getPrivateKey())
      .update(content)
      .digest('hex');
  },
  getPrivateKey() {
    return 'qhe9gfRxWIrJVt2bXP9ltwzup1hWnvYEQ';
  }
};
