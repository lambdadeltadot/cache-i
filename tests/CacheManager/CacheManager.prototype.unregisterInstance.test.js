const CacheManager = require('../../CacheManager');

describe('CacheManager.prototype.unregisterInstance(key)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('key is null', () => {
    test('should throw TypeError', () => {
      expect(() => instance.unregisterInstance(null)).toThrowError(TypeError);
    });
  });

  describe('key is not null', () => {
    const key = 'key';

    describe('key does not exists', () => {
      beforeEach(() => {
        delete instance._instanceList[key];
      });

      test('should do nothing to the list', () => {
        const oldList = { ...instance._instanceList };
        instance.unregisterInstance(key);
        expect(instance._instanceList).toStrictEqual(oldList);
      });
    });

    describe('key does exists', () => {
      beforeEach(() => {
        instance._instanceList[key] = {};
      });

      test('should remove the key from the list', () => {
        instance.unregisterInstance(key);
        expect(instance._instanceList[key]).toBeUndefined();
      });
    });
  });
});
