const CacheManager = require('../../CacheManager');

describe('CacheManager.prototype.getDefaultInstance()', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('default key is not yet set', () => {
    beforeEach(() => {
      instance._defaultInstanceKey = null;
      instance._instanceList = {};
    });

    describe('list is empty', () => {
      test('should throw RangeError', () => {
        expect(() => instance.getDefaultInstance()).toThrowError(RangeError);
      });
    });

    describe('list has one entry', () => {
      const key = 'key';
      const cache = {};

      beforeEach(() => {
        instance._instanceList[key] = cache;
      });

      test('should return that one entry', () => {
        expect(instance.getDefaultInstance()).toBe(cache);
      });
    });

    describe('list has more than one entry', () => {
      const entries = [
        ['key1', {}],
        ['key2', {}]
      ];

      beforeEach(() => {
        entries.forEach(([key, cache]) => {
          instance._instanceList[key] = cache;
        });
      });

      test('should return the first entry added', () => {
        expect(instance.getDefaultInstance()).toBe(entries[0][1]);
        expect(instance.getDefaultInstance()).not.toBe(entries[1][1]);
      });
    });
  });

  describe('default key is set', () => {
    const defaultKey = 'default';
    const defaultValue = {};

    beforeEach(() => {
      instance._defaultInstanceKey = defaultKey;
    });

    describe('default key is not registered', () => {
      beforeEach(() => {
        delete instance._instanceList[defaultKey];
      });

      test('should throw Reference error', () => {
        expect(() => instance.getDefaultInstance()).toThrowError(ReferenceError);
      });
    });

    describe('default key is registered', () => {
      beforeEach(() => {
        instance._instanceList[defaultKey] = defaultValue;
      });

      test('should return the instance saved to the default key', () => {
        expect(instance.getDefaultInstance()).toBe(defaultValue);
      });
    });
  });
});
