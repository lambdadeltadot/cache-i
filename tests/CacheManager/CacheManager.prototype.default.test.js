const CacheManager = require('../../CacheManager');
const Cache = require('../../Interface/Cache');

describe('CacheManager.prototype.default()', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('default key is not yet set', () => {
    beforeEach(() => {
      instance._default = null;
      instance._list = {};
    });

    describe('list is empty', () => {
      test('should throw RangeError', () => {
        expect(() => instance.default()).toThrowError(RangeError);
      });
    });

    describe('list has one entry', () => {
      const key = 'key';
      const cache = new Cache();

      beforeEach(() => {
        instance._list[key] = cache;
      });

      test('should return that one entry', () => {
        expect(instance.default()).toBe(cache);
      });
    });

    describe('list has more than one entry', () => {
      const entries = [
        ['key1', new Cache()],
        ['key2', new Cache()]
      ];

      beforeEach(() => {
        entries.forEach(([key, cache]) => {
          instance._list[key] = cache;
        });
      });

      test('should return the first entry added', () => {
        expect(instance.default()).toBe(entries[0][1]);
        expect(instance.default()).not.toBe(entries[1][1]);
      });
    });
  });

  describe('default key is set', () => {
    const defaultKey = 'default';
    const defaultValue = new Cache();

    beforeEach(() => {
      instance._default = defaultKey;
    });

    describe('default key is not registered', () => {
      beforeEach(() => {
        delete instance._list[defaultKey];
      });

      test('should throw Reference error', () => {
        expect(() => instance.default()).toThrowError(ReferenceError);
      });
    });

    describe('default key is registered', () => {
      beforeEach(() => {
        instance._list[defaultKey] = defaultValue;
      });

      test('should return the instance saved to the default key', () => {
        expect(instance.default()).toBe(defaultValue);
      });
    });
  });
});
