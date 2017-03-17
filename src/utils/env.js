/**
 * Created by hshen on 6/7/2015.
 */
module.exports = {
    CLIENT: typeof window !== 'undefined',
    SERVER: typeof window === 'undefined'
};
