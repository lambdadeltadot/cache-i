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
   * @returns {import('./ICache')}
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
   * @returns {import('./ICache')} the instance with the given key, or the default instance if given key is null
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
   * @param {import('./ICache')} instance the instance to register
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
  /**
   * Saves the given value if the identifying key does not have a value yet.
   *
   * @param {string} key the unique key to identify the saving value
   * @param {T} value the value to be saved
   * @param {number|Date} ttl the time to live in milliseconds, or the date when the value will expire
   *
   * @returns {Promise<boolean>} a promise that resolves to true if key does not have a value yet and is successfully saved, or false if key already has value
   *
   * @template T
   */
  add (key, value, ttl) {
    return this.getDefaultInstance().add(key, value, ttl);
  }

  /**
   * Decrements the value on the cache with the given amount.
   *
   * @param {string} key the unique key to identify the saving value
   * @param {number} [amount] the amount to decrement
   *
   * @returns {Promise<number>} a promise that resolves to the value after decrementing
   */
  decrement (key, amount) {
    return this.getDefaultInstance().decrement(key, amount);
  }

  /**
   * Saves the given value without expiration.
   *
   * @param {string} key the unique key to identify the saving value
   * @param {T} value the value to be saved
   *
   * @returns {Promise<boolean>} a promise that resolves to true if successfully saved, otherwise false
   *
   * @template T
   */
  forever (key, value) {
    return this.getDefaultInstance().forever(key, value);
  }

  /**
   * Removes the value of the identifying key from the cache.
   *
   * @param {string} key the key identifying the value to remove
   *
   * @returns {Promise<boolean>} a promise that resolves to true if existing and successfully removed, or false if key already not in the cache
   */
  forget (key) {
    return this.getDefaultInstance().forget(key);
  }

  /**
   * Retrieves the value identified by the given key.
   *
   * @param {string} key the key that identifies the value to retrieve
   * @param {T} [defaultValue] the value to return in case the key doesn't have a value
   *
   * @returns {Promise<T>} a promise that resolves to the value retrieved, or the default value if key doesn't have a value
   *
   * @template T
   */
  get (key, defaultValue) {
    return this.getDefaultInstance().get(key, defaultValue);
  }

  /**
   * Determines whether the key has value.
   *
   * @param {string} key the key to check
   *
   * @returns {Promise<boolean>} a promise that resolves to true if has value, otherwise false
   */
  has (key) {
    return this.getDefaultInstance().has(key);
  }

  /**
   * Increments the value on the cache with the given amount.
   *
   * @param {string} key the unique key to identify the saving value
   * @param {number} [amount] the amount to increment
   *
   * @returns {Promise<number>} a promise that resolves to the value after incrementing
   */
  increment (key, amount) {
    return this.getDefaultInstance().increment(key, amount);
  }

  /**
   * Determines whether the key doesn't have a value
   *
   * @param {string} key the key to check
   *
   * @returns {Promise<boolean>} a promise that resolves to true if doesn't have a value, otherwise false
   */
  missing (key) {
    return this.getDefaultInstance().missing(key);
  }

  /**
   * Retrieves the value identified by the given key, then remove the value for
   * that key on the cache.
   *
   * @param {string} key the key that identifies the value to retrieve
   * @param {T} defaultValue the value to return in case the key doesn't have a value
   *
   * @returns {Promise<T>} a promise that resolves to the value retrieved, or the default value if key doesn't have a value
   *
   * @template T
   */
  pull (key, defaultValue) {
    return this.getDefaultInstance().pull(key, defaultValue);
  }

  /**
   * Saves the given value to the cache.
   *
   * @param {string} key the unique key to identify the saving value
   * @param {T} value the value to be saved
   * @param {number|Date} ttl the time to live in milliseconds, or the date when the value will expire
   *
   * @returns {Promise<boolean>} a promise that resolves to true if successfully saved, otherwise false
   *
   * @template T
   */
  put (key, value, ttl) {
    return this.getDefaultInstance().put(key, value, ttl);
  }

  /**
   * Retrieve the value from the cache. If the key doesn't have a value, the generator
   * function will be used to create the value to be saved on the cache with the given
   * ttl. After saving, the generated value will be returned.
   *
   * @param {string} key the unique key to identify the retrieving and saving value
   * @param {number|Date} ttl the time to live in milliseconds or the date when the value will expire
   * @param {() => T} generator the function used to generate the value to be saved
   *
   * @returns {Promise<T>} a promise that resolves to the retrieved value or the generated value
   *
   * @template T
   */
  remember (key, ttl, generator) {
    return this.getDefaultInstance().remember(key, ttl, generator);
  }

  /**
   * Retrieve the value from the cache. If the key doesn't have a value, the generator
   * function will be used to create the value to be saved on the cache forever. After
   * saving, the generated value will be returned.
   *
   * @param {string} key the unique key to identify the retrieving and saving value
   * @param {() => T} generator the function used to generate the value to be saved
   *
   * @returns {Promise<T>} a promise that resolves to the retrieved value or the generated value
   *
   * @template T
   */
  rememberForever (key, generator) {
    return this.getDefaultInstance().rememberForever(key, generator);
  }
}

module.exports = CacheManager;
