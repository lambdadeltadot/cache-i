const CacheManager = require('../../CacheManager');
const Cache = require('../../Interface/Cache');

describe('CacheManager.prototype.setDefault(key)', () => {
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
        instance._default = null;
      });

      test('should set default key to null', () => {
        instance.setDefault(null);
        expect(instance._default).toBeNull();
      });
    });

    describe('default key is not null', () => {
      beforeEach(() => {
        const defaultKey = instance._default = 'not null';
        instance._list[defaultKey] = new Cache();
      });

      test('should set default key to null', () => {
        instance.setDefault(null);
        expect(instance._default).toBeNull();
      });
    });
  });

  describe('key param is not null', () => {
    const key = 'key';

    describe('given key does not exists', () => {
      describe('default key is null', () => {
        beforeEach(() => {
          instance._default = null;
        });

        test('should throw ReferenceError', () => {
          expect(() => instance.setDefault(key)).toThrowError(ReferenceError);
        });
      });

      describe('default key is not null', () => {
        beforeEach(() => {
          const defaultKey = instance._default = 'not null';
          instance._list[defaultKey] = new Cache();
        });

        test('should throw ReferenceError', () => {
          expect(() => instance.setDefault(key)).toThrowError(ReferenceError);
        });
      });
    });

    describe('given key does exists', () => {
      beforeEach(() => {
        instance._list[key] = new Cache();
      });

      describe('default key is null', () => {
        beforeEach(() => {
          instance._default = null;
        });

        test('should set to the given key', () => {
          instance.setDefault(key);
          expect(instance._default).toBe(key);
        });
      });

      describe('default key is not null', () => {
        const defaultKey = 'not null';

        beforeEach(() => {
          instance._default = defaultKey;
          instance._list[defaultKey] = new Cache();
        });

        test('should set to the given key', () => {
          instance.setDefault(key);
          expect(instance._default).toBe(key);
          expect(instance._default).not.toBe(defaultKey);
        });
      });
    });
  });
});
