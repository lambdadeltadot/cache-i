const CacheManager = require('../../CacheManager');

describe('CacheManager.prototype.isRegistered(key)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('key param is null', () => {
    test('should throw TypeError', () => {
      expect(() => instance.isRegistered(null)).toThrowError(TypeError);
    });
  });

  describe('key param is not null', () => {
    const key = 'key';

    describe('key does not exists', () => {
      beforeEach(() => {
        delete instance._instanceList[key];
      });

      test('should return false', () => {
        expect(instance.isRegistered(key)).toBeFalsy();
      });
    });

    describe('key does exists', () => {
      beforeEach(() => {
        instance._instanceList[key] = {};
      });

      test('should return true', () => {
        expect(instance.isRegistered(key)).toBeTruthy();
      });
    });
  });
});
