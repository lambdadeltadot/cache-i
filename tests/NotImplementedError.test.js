const NotImplementedError = require('../NotImplementedError');

describe('NotImplementedError', () => {
  test('should set the message that has the method name in it', () => {
    const methodName = 'method_name';
    const error = new NotImplementedError(methodName);
    expect(error.message).toContain(methodName);
  });
});
