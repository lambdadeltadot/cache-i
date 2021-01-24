const CacheManager = require('../../CacheManager');
const Cache = require('../../Interface/Cache');

describe('CacheManager.prototype.register(key, instance)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;
  const key = 'key';
  const cache = new Cache();

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('key is null', () => {
    describe('instance is not a Cache', () => {
      test('should throw TypeError for type of key', () => {
        expect(() => instance.register(null, 'not a cache')).toThrowError(TypeError);
        expect(() => instance.register(null, 'not a cache')).toThrowError(/key cannot be null/);
      });
    });

    describe('instance is a Cache', () => {
      test('should throw TypeError for type of key', () => {
        expect(() => instance.register(null, cache)).toThrowError(TypeError);
        expect(() => instance.register(null, cache)).toThrowError(/key cannot be null/);
      });
    });
  });

  describe('key is not null', () => {
    describe('key not exists yet', () => {
      beforeEach(() => {
        delete instance._list[key];
      });

      describe('instance is not a Cache', () => {
        test('should throw TypeError for type of instance', () => {
          expect(() => instance.register(key, 'not a cache')).toThrowError(TypeError);
          expect(() => instance.register(key, 'not a cache')).toThrowError(/instance should be an instance of Cache/);
        });
      });

      describe('instance is a Cache', () => {
        test('should set the key on the list with the cache', () => {
          instance.register(key, cache);
          expect(instance._list[key]).toBe(cache);
        });
      });
    });

    describe('key already exists', () => {
      const existingCache = new Cache();

      beforeEach(() => {
        instance._list[key] = existingCache;
      });

      describe('instance is not a Cache', () => {
        test('should throw TypeError for type of instance', () => {
          expect(() => instance.register(key, 'not a cache')).toThrowError(TypeError);
          expect(() => instance.register(key, 'not a cache')).toThrowError(/instance should be an instance of Cache/);
        });
      });

      describe('instance is a Cache', () => {
        test('should replace the instance on the key', () => {
          instance.register(key, cache);
          expect(instance._list[key]).toBe(cache);
          expect(instance._list[key]).not.toBe(existingCache);
        });
      });
    });
  });
});
