const NotImplementedError = require('../NotImplementedError');

/**
 * Manages multiple cache instances.
 *
 * @interface
 */
class CacheManager {
  /**
   * Get the default instance if it exists. Will get the first instance on the manager's list if default is not yet set.
   *
   * @returns {import('./Cache')}
   */
  default () {
    throw new NotImplementedError('default');
  }

  /**
   * Get the instance with the following key.
   *
   * @param {string} [key=null]   the key of the instance to get, get the default instance if null
   *
   * @returns {import('./Cache')} the instance with the given key, or the default instance if given key is null
   */
  instance (key = null) {
    throw new NotImplementedError('instance');
  }

  /**
   * Checks if there is an instance registered to the given key.
   *
   * @param {string} key  the key to check
   *
   * @returns {boolean}   true if there is an instance registered with given key, otherwise false
   */
  isRegistered (key) {
    throw new NotImplementedError('isRegistered');
  }

  /**
   * Add the cache instance to the list. This will replace existing instance on the given key if there is already an instance registered to that key.
   *
   * @param {string}            key       the key where to register the given instance
   * @param {import('./Cache')} instance  the instance to be registered
   *
   * @returns {this}                      the cache manager for method chaining
   */
  register (key, instance) {
    throw new NotImplementedError('register');
  }

  /**
   * Sets the default key for this manager.
   *
   * @param {null|string} key the key of the instance to set as default
   *
   * @returns {this}          the cache manager for method chaining
   */
  setDefault (key) {
    throw new NotImplementedError('setDefault');
  }

  /**
   * Removes the cache instance with the given key from the list.
   *
   * @param {string} key  the key to unregister
   *
   * @returns {this}      the cache manager for method chaining
   */
  unregister (key) {
    throw new NotImplementedError('unregister');
  }
}

module.exports = CacheManager;
