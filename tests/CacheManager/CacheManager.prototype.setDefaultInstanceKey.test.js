const CacheManager = require('../../CacheManager');

describe('CacheManager.prototype.setDefaultInstanceKey(key)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('key param is null', () => {
    describe('default key is null', () => {
      beforeEach(() => {
        instance._defaultInstanceKey = null;
      });

      test('should set default key to null', () => {
        instance.setDefaultInstanceKey(null);
        expect(instance._defaultInstanceKey).toBeNull();
      });
    });

    describe('default key is not null', () => {
      beforeEach(() => {
        const defaultKey = instance._defaultInstanceKey = 'not null';
        instance._instanceList[defaultKey] = {};
      });

      test('should set default key to null', () => {
        instance.setDefaultInstanceKey(null);
        expect(instance._defaultInstanceKey).toBeNull();
      });
    });
  });

  describe('key param is not null', () => {
    const key = 'key';

    describe('given key does not exists', () => {
      describe('default key is null', () => {
        beforeEach(() => {
          instance._defaultInstanceKey = null;
        });

        test('should throw ReferenceError', () => {
          expect(() => instance.setDefaultInstanceKey(key)).toThrowError(ReferenceError);
        });
      });

      describe('default key is not null', () => {
        beforeEach(() => {
          const defaultKey = instance._defaultInstanceKey = 'not null';
          instance._instanceList[defaultKey] = {};
        });

        test('should throw ReferenceError', () => {
          expect(() => instance.setDefaultInstanceKey(key)).toThrowError(ReferenceError);
        });
      });
    });

    describe('given key does exists', () => {
      beforeEach(() => {
        instance._instanceList[key] = {};
      });

      describe('default key is null', () => {
        beforeEach(() => {
          instance._defaultInstanceKey = null;
        });

        test('should set to the given key', () => {
          instance.setDefaultInstanceKey(key);
          expect(instance._defaultInstanceKey).toBe(key);
        });
      });

      describe('default key is not null', () => {
        const defaultKey = 'not null';

        beforeEach(() => {
          instance._defaultInstanceKey = defaultKey;
          instance._instanceList[defaultKey] = {};
        });

        test('should set to the given key', () => {
          instance.setDefaultInstanceKey(key);
          expect(instance._defaultInstanceKey).toBe(key);
          expect(instance._defaultInstanceKey).not.toBe(defaultKey);
        });
      });
    });
  });
});
