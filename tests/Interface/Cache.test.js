const CacheInterface = require('../../Interface/Cache');
const NotImplementedError = require('../../NotImplementedError');

describe('Interface/CacheManager', () => {
  const instance = new CacheInterface();

  describe('should throw NotImplementedError', () => {
    test('add', () => {
      expect(() => instance.add()).toThrowError(NotImplementedError);
    });

    test('decrement', () => {
      expect(() => instance.decrement()).toThrowError(NotImplementedError);
    });

    test('forever', () => {
      expect(() => instance.forever()).toThrowError(NotImplementedError);
    });

    test('forget', () => {
      expect(() => instance.forget()).toThrowError(NotImplementedError);
    });

    test('get', () => {
      expect(() => instance.get()).toThrowError(NotImplementedError);
    });

    test('has', () => {
      expect(() => instance.has()).toThrowError(NotImplementedError);
    });

    test('increment', () => {
      expect(() => instance.increment()).toThrowError(NotImplementedError);
    });

    test('missing', () => {
      expect(() => instance.missing()).toThrowError(NotImplementedError);
    });

    test('pull', () => {
      expect(() => instance.pull()).toThrowError(NotImplementedError);
    });

    test('put', () => {
      expect(() => instance.put()).toThrowError(NotImplementedError);
    });

    test('remember', () => {
      expect(() => instance.remember()).toThrowError(NotImplementedError);
    });

    test('rememberForever', () => {
      expect(() => instance.rememberForever()).toThrowError(NotImplementedError);
    });
  });
});
