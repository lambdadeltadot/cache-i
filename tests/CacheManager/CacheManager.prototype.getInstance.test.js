const CacheManager = require('../../CacheManager');

describe('CacheManager.prototype.getInstance(key = null)', () => {
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
        instance._defaultInstanceKey = null;
        instance._instanceList = {};
      });

      describe('list is empty', () => {
        test('should throw RangeError', () => {
          expect(() => instance.getInstance()).toThrowError(RangeError);
        });
      });

      describe('list has one entry', () => {
        const key = 'key';
        const cache = {};

        beforeEach(() => {
          instance._instanceList[key] = cache;
        });

        test('should return that one entry', () => {
          expect(instance.getInstance()).toBe(cache);
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
          expect(instance.getInstance()).toBe(entries[0][1]);
          expect(instance.getInstance()).not.toBe(entries[1][1]);
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
          expect(() => instance.getInstance()).toThrowError(ReferenceError);
        });
      });

      describe('default key is registered', () => {
        beforeEach(() => {
          instance._instanceList[defaultKey] = defaultValue;
        });

        test('should return the instance saved to the default key', () => {
          expect(instance.getInstance()).toBe(defaultValue);
        });
      });
    });
  });

  describe('input key is null', () => {
    describe('default key is not yet set', () => {
      beforeEach(() => {
        instance._defaultInstanceKey = null;
        instance._instanceList = {};
      });

      describe('list is empty', () => {
        test('should throw RangeError', () => {
          expect(() => instance.getInstance(null)).toThrowError(RangeError);
        });
      });

      describe('list has one entry', () => {
        const key = 'key';
        const cache = {};

        beforeEach(() => {
          instance._instanceList[key] = cache;
        });

        test('should return that one entry', () => {
          expect(instance.getInstance(null)).toBe(cache);
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
          expect(instance.getInstance(null)).toBe(entries[0][1]);
          expect(instance.getInstance(null)).not.toBe(entries[1][1]);
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
          expect(() => instance.getInstance(null)).toThrowError(ReferenceError);
        });
      });

      describe('default key is registered', () => {
        beforeEach(() => {
          instance._instanceList[defaultKey] = defaultValue;
        });

        test('should return the instance saved to the default key', () => {
          expect(instance.getInstance(null)).toBe(defaultValue);
        });
      });
    });
  });

  describe('key is given', () => {
    const key = 'key';
    const cache = {};

    describe('key does not exists', () => {
      beforeEach(() => {
        delete instance._instanceList[key];
      });

      test('should throw ReferenceError', () => {
        expect(() => instance.getInstance(key)).toThrowError(ReferenceError);
      });
    });

    describe('key exists', () => {
      beforeEach(() => {
        instance._instanceList[key] = cache;
      });

      test('should return the value on the key', () => {
        expect(instance.getInstance(key)).toBe(cache);
      });
    });
  });
});
