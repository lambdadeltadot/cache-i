const CacheManagerInterface = require('../../Interface/CacheManager');
const NotImplementedError = require('../../NotImplementedError');

describe('Interface/CacheManager', () => {
  const instance = new CacheManagerInterface();

  describe('should throw NotImplementedError', () => {
    test('default', () => {
      expect(() => instance.default()).toThrowError(NotImplementedError);
    });

    test('instance', () => {
      expect(() => instance.instance()).toThrowError(NotImplementedError);
    });

    test('isRegistered', () => {
      expect(() => instance.isRegistered()).toThrowError(NotImplementedError);
    });

    test('register', () => {
      expect(() => instance.register()).toThrowError(NotImplementedError);
    });

    test('setDefault', () => {
      expect(() => instance.setDefault()).toThrowError(NotImplementedError);
    });

    test('unregister', () => {
      expect(() => instance.unregister()).toThrowError(NotImplementedError);
    });
  });
});
