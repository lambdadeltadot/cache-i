const CacheManager = require('../../CacheManager');
const Cache = require('../../Interface/Cache');

describe('CacheManager.prototype.instance(key = null)', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  beforeEach(() => {
    instance = new CacheManager();
  });

  describe('input key is not given', () => {
    describe('default key is not yet set', () => {
      beforeEach(() => {
        instance._default = null;
        instance._list = {};
      });

      describe('list is empty', () => {
        test('should throw RangeError', () => {
          expect(() => instance.instance()).toThrowError(RangeError);
        });
      });

      describe('list has one entry', () => {
        const key = 'key';
        const cache = new Cache();

        beforeEach(() => {
          instance._list[key] = cache;
        });

        test('should return that one entry', () => {
          expect(instance.instance()).toBe(cache);
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
          expect(instance.instance()).toBe(entries[0][1]);
          expect(instance.instance()).not.toBe(entries[1][1]);
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
          expect(() => instance.instance()).toThrowError(ReferenceError);
        });
      });

      describe('default key is registered', () => {
        beforeEach(() => {
          instance._list[defaultKey] = defaultValue;
        });

        test('should return the instance saved to the default key', () => {
          expect(instance.instance()).toBe(defaultValue);
        });
      });
    });
  });

  describe('input key is null', () => {
    describe('default key is not yet set', () => {
      beforeEach(() => {
        instance._default = null;
        instance._list = {};
      });

      describe('list is empty', () => {
        test('should throw RangeError', () => {
          expect(() => instance.instance(null)).toThrowError(RangeError);
        });
      });

      describe('list has one entry', () => {
        const key = 'key';
        const cache = new Cache();

        beforeEach(() => {
          instance._list[key] = cache;
        });

        test('should return that one entry', () => {
          expect(instance.instance(null)).toBe(cache);
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
          expect(instance.instance(null)).toBe(entries[0][1]);
          expect(instance.instance(null)).not.toBe(entries[1][1]);
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
          expect(() => instance.instance(null)).toThrowError(ReferenceError);
        });
      });

      describe('default key is registered', () => {
        beforeEach(() => {
          instance._list[defaultKey] = defaultValue;
        });

        test('should return the instance saved to the default key', () => {
          expect(instance.instance(null)).toBe(defaultValue);
        });
      });
    });
  });

  describe('key is given', () => {
    const key = 'key';
    const cache = new Cache();

    describe('key does not exists', () => {
      beforeEach(() => {
        delete instance._list[key];
      });

      test('should throw ReferenceError', () => {
        expect(() => instance.instance(key)).toThrowError(ReferenceError);
      });
    });

    describe('key exists', () => {
      beforeEach(() => {
        instance._list[key] = cache;
      });

      test('should return the value on the key', () => {
        expect(instance.instance(key)).toBe(cache);
      });
    });
  });
});
