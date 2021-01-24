/**
 * Thrown when the method is called but it is not yet implemented.
 *
 * @extends {Error}
 */
class NotImplementedError extends Error {
  constructor (methodName) {
    super(`${methodName} is not yet implemented.`);
  }
}

module.exports = NotImplementedError;
