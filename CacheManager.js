const getInstance = require('./utils/getInstance');

/**
 * Manages multiple cache instances.
 *
 * @implements {import('@lambdadeltadot/cache-i').ICacheManager}
 */
class CacheManager {
  constructor () {
    /**
     * The key of the instance that will be used as the default one.
     *
     * @protected
     *
     * @type {null|string}
     */
    this._defaultInstanceKey = null;

    /**
     * The list of cache instance registered to this manager.
     *
     * @protected
     *
     * @type {import('@lambdadeltadot/cache-i').CacheInstanceList}
     */
    this._instanceList = {};
  }

  // ================================================================================
  // CACHE MANAGER IMPLEMENTATION
  // ================================================================================

  /**
   * Get the default instance if it exists. Will get the first
   * instance on the instance list if default instance key is
   * not yet set.
   *
   * @returns {import('@lambdadeltadot/cache-i').ICache}
   *
   * @throws {RangeError} when instance list is empty and default instance key is not yet set
   * @throws {ReferenceError} when the currently set default key does not exists
   */
  getDefaultInstance () {
    if (this._defaultInstanceKey === null) {
      for (const key in this._instanceList) { // eslint-disable-line no-unreachable-loop
        return this._instanceList[key];
      }

      throw new RangeError('instance list is empty');
    }

    return getInstance(this._instanceList, this._defaultInstanceKey);
  }

  /**
   * Get the instance with the given key. If given key is null, returns the
   * default instance.
   *
   * @param {string} [key=null] the key of the instance to get
   *
   * @returns {import('@lambdadeltadot/cache-i').ICache} the instance with the given key, or the default instance if given key is null
   *
   * @throws {RangeError} when instance list is empty and given key is null
   * @throws {ReferenceError} when the given key does not exist
   */
  getInstance (key = null) {
    if (key === null) {
      return this.getDefaultInstance();
    }

    return getInstance(this._instanceList, key);
  }

  /**
   * Checks if there is an instance already registered under the given key.
   *
   * @param {string} key the key to check
   *
   * @returns {boolean} true if there is, otherwise false
   *
   * @throws {TypeError} when given key is null
   */
  isRegistered (key) {
    if (key === null) {
      throw new TypeError('key cannot be null');
    }

    return !!this._instanceList[key];
  }

  /**
   * Adds the given cache instance to the list. This will replace the existing
   * instance if there is already an instance registered to the given key.
   *
   * @param {string} key the key where to register the instance
   * @param {import('@lambdadeltadot/cache-i').ICache} instance the instance to register
   *
   * @returns {this}
   *
   * @throws {ReferenceError} when the given key is null
   */
  registerInstance (key, instance) {
    if (key === null) {
      throw new TypeError('key cannot be null');
    }

    this._instanceList[key] = instance;
    return this;
  }

  /**
   * Sets the default instance key for this manager.
   *
   * @param {null|string} key the key to set as default, use null to use the first instance on the instance list
   *
   * @returns {this}
   *
   * @throws {ReferenceError} when the given key does not exists
   */
  setDefaultInstanceKey (key) {
    if (key === null || this.isRegistered(key)) {
      this._defaultInstanceKey = key;
      return this;
    }

    throw new ReferenceError(`instance with key "${key}" does not exists`);
  }

  /**
   * Removes the cache instance with the given key from the list.
   *
   * @param {string} key the key to unregister
   *
   * @returns {this}
   *
   * @throws {TypeError} when the given key is null
   */
  unregisterInstance (key) {
    if (key === null) {
      throw new TypeError('key cannot be null');
    }

    delete this._instanceList[key];
    return this;
  }

  // ================================================================================
  // DEFAULT CACHE INTERFACE IMPLEMENTATION
  // ================================================================================

  add (key, value, ttl) {
    return this.getDefaultInstance().add(key, value, ttl);
  }

  decrement (key, amount) {
    return this.getDefaultInstance().decrement(key, amount);
  }

  forever (key, value) {
    return this.getDefaultInstance().forever(key, value);
  }

  forget (key) {
    return this.getDefaultInstance().forget(key);
  }

  get (key, defaultValue) {
    return this.getDefaultInstance().get(key, defaultValue);
  }

  has (key) {
    return this.getDefaultInstance().has(key);
  }

  increment (key, amount) {
    return this.getDefaultInstance().increment(key, amount);
  }

  missing (key) {
    return this.getDefaultInstance().missing(key);
  }

  pull (key, defaultValue) {
    return this.getDefaultInstance().pull(key, defaultValue);
  }

  put (key, value, ttl) {
    return this.getDefaultInstance().put(key, value, ttl);
  }

  remember (key, ttl, generator) {
    return this.getDefaultInstance().remember(key, ttl, generator);
  }

  rememberForever (key, generator) {
    return this.getDefaultInstance().rememberForever(key, generator);
  }
}

module.exports = CacheManager;
