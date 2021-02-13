const CacheManager = require('../../CacheManager');

describe('CacheManager.ICacheImplementation', () => {
  /**
   * @type {CacheManager}
   */
  let instance;

  let cacheInstance;

  beforeEach(() => {
    instance = new CacheManager();
    cacheInstance = {};
    instance.registerInstance('test', cacheInstance)
      .setDefaultInstanceKey('test');
  });

  describe('add', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.add = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const value = 12345;
      const ttl = new Date();

      instance.add(key, value, ttl);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, value, ttl);
    });
  });

  describe('decrement', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.decrement = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const amount = 12345;

      instance.decrement(key, amount);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, amount);
    });
  });

  describe('forever', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.forever = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const value = 12345;

      instance.forever(key, value);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, value);
    });
  });

  describe('forget', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.forget = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';

      instance.forget(key);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key);
    });
  });

  describe('get', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.get = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const defaultValue = 12345;

      instance.get(key, defaultValue);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, defaultValue);
    });
  });

  describe('has', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.has = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';

      instance.has(key);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key);
    });
  });

  describe('increment', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.increment = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const amount = 12345;

      instance.increment(key, amount);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, amount);
    });
  });

  describe('missing', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.missing = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';

      instance.missing(key);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key);
    });
  });

  describe('pull', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.pull = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const defaultValue = 12345;

      instance.pull(key, defaultValue);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, defaultValue);
    });
  });

  describe('put', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.put = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const value = 12345;
      const ttl = new Date();

      instance.put(key, value, ttl);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, value, ttl);
    });
  });

  describe('remember', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.remember = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const ttl = new Date();
      const generator = () => null;

      instance.remember(key, ttl, generator);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, ttl, generator);
    });
  });

  describe('rememberForever', () => {
    let mockFn;

    beforeEach(() => {
      mockFn = cacheInstance.rememberForever = jest.fn();
    });

    test('should just pass the arguments to the default instance with same method name', () => {
      const key = 'key';
      const generator = () => null;

      instance.rememberForever(key, generator);
      expect(mockFn).toBeCalled();
      expect(mockFn).toBeCalledWith(key, generator);
    });
  });
});
