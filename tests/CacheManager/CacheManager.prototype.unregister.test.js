const CacheManager = require('../../CacheManager');
const Cache = require('../../Interface/Cache');

describe('CacheManager.prototype.unregister(key)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('key is null', () => {
    test('should throw TypeError', () => {
      expect(() => instance.unregister(null)).toThrowError(TypeError);
    });
  });

  describe('key is not null', () => {
    const key = 'key';

    describe('key does not exists', () => {
      beforeEach(() => {
        delete instance._list[key];
      });

      test('should do nothing to the list', () => {
        const oldList = { ...instance._list };
        instance.unregister(key);
        expect(instance._list).toStrictEqual(oldList);
      });
    });

    describe('key does exists', () => {
      beforeEach(() => {
        instance._list[key] = new Cache();
      });

      test('should remove the key from the list', () => {
        instance.unregister(key);
        expect(instance._list[key]).toBeUndefined();
      });
    });
  });
});
