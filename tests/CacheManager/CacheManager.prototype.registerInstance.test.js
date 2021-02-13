const CacheManager = require('../../CacheManager');

describe('CacheManager.prototype.registerInstance(key, instance)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;
  const key = 'key';
  const cache = {};

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('key is null', () => {
    test('should throw TypeError for type of key', () => {
      expect(() => instance.registerInstance(null, cache)).toThrowError(TypeError);
      expect(() => instance.registerInstance(null, cache)).toThrowError(/key cannot be null/);
    });
  });

  describe('key is not null', () => {
    describe('key not exists yet', () => {
      beforeEach(() => {
        delete instance._instanceList[key];
      });

      test('should set the key on the list with the cache', () => {
        instance.registerInstance(key, cache);
        expect(instance._instanceList[key]).toBe(cache);
      });
    });

    describe('key already exists', () => {
      const existingCache = {};

      beforeEach(() => {
        instance._instanceList[key] = existingCache;
      });

      test('should replace the instance on the key', () => {
        instance.registerInstance(key, cache);
        expect(instance._instanceList[key]).toBe(cache);
        expect(instance._instanceList[key]).not.toBe(existingCache);
      });
    });
  });
});
