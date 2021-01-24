const NotImplementedError = require('../NotImplementedError');

/**
 * The interface for all Cache implementations.
 *
 * @interface
 */
class Cache {
  /**
   * Add the given value if the key does not yet exists on the cache.
   *
   * @abstract
   * @async
   *
   * @param {string}      key     the key to identify the value saved
   * @param {any}         value   the value being saved
   * @param {number|Date} ttl     the time to live in seconds or the date when the value will expire
   *
   * @returns {Promise<boolean>}  resolves to true if key not exists and successfully saved, or false if already exists
   */
  add (key, value, ttl) {
    throw new NotImplementedError('add');
  }

  /**
   * Decrements the value on the cache with the given amount.
   *
   * @abstract
   * @async
   *
   * @param {string} key        the key to identify the decrementing value
   * @param {number} [amount=1] the amount to decrement
   *
   * @returns {Promise<number>} resolves to the value after decrement
   */
  decrement (key, amount = 1) {
    throw new NotImplementedError('decrement');
  }

  /**
   * Adds the given value without expiration.
   *
   * @abstract
   * @async
   *
   * @param {string}  key         the key to identify the value saved
   * @param {any}     value       the value to be saved
   *
   * @returns {Promise<boolean>}  resolves to true if successfully saved, otherwise false
   */
  forever (key, value) {
    throw new NotImplementedError('forever');
  }

  /**
   * Removes the key from the cache.
   *
   * @abstract
   * @async
   *
   * @param {string} key          the key to forget
   *
   * @returns {Promise<boolean>}  resolves to true if key exists and successfully removed, or false if key does not exists
   */
  forget (key) {
    throw new NotImplementedError('forget');
  }

  /**
   * Retrieves the value with the given key.
   *
   * @abstract
   * @async
   *
   * @param {string}  key             the key to identify the value to get
   * @param {any}     [defaultValue]  the value to return if key does not exists or is already expired
   *
   * @returns {Promise<any>}          the value retrieved, or the default value if key does not exists or is already expired
   */
  get (key, defaultValue) {
    throw new NotImplementedError('get');
  }

  /**
   * Determines whether the key exists on the cache.
   *
   * @abstract
   * @async
   *
   * @param {string} key          the key to check
   *
   * @returns {Promise<boolean>}  resolves to true if exists, otherwise false
   */
  has (key) {
    throw new NotImplementedError('has');
  }

  /**
   * Increments the value on the cache with the given amount.
   *
   * @abstract
   * @async
   *
   * @param {string} key        the key to identify the incrementing value
   * @param {number} [amount=1] the amount to increment
   *
   * @returns {Promise<number>} resolves to the value after increment
   */
  increment (key, value = 1) {
    throw new NotImplementedError('increment');
  }

  /**
   * Determines whether the key does not exists.
   *
   * @abstract
   * @async
   *
   * @param {string} key          the key to check
   *
   * @returns {Promise<boolean>}  resolves to true if not exists and or is expired, otherwise false
   */
  missing (key) {
    throw new NotImplementedError('missing');
  }

  /**
   * Remove the entry with the given key from the cache, then return that value of that entry.
   *
   * @abstract
   * @async
   *
   * @param {string}  key             the key of the entry to pull
   * @param {any}     [defaultValue]  the value to return if key does not exists or is already expired
   *
   * @returns {Promise<any>}          resolves to the value retrieved, or the default value if key does not exists or is already expired
   */
  pull (key, defaultValue) {
    throw new NotImplementedError('pull');
  }

  /**
   * Sets the value on the cache.
   *
   * @abstract
   * @async
   *
   * @param {string}      key     the key to identify the value saved
   * @param {any}         value   the value being saved
   * @param {number|Date} ttl     the time to live in seconds or the date when the value will expire
   *
   * @returns {Promise<boolean>}  resolves to true if successfully saved
   */
  put (key, value, ttl) {
    throw new NotImplementedError('put');
  }

  /**
   * Retrieve the value from the cache. If key does not exists, the generator will
   * be used to create the value to be saved on the cache with the given ttl. After
   * saving, the generated value will be returned.
   *
   * @abstract
   * @async
   *
   * @param {string}      key       the key to identify the value saved
   * @param {number|Date} ttl       the time to live in seconds or the date when the value will expire
   * @param {() => any}   generator the function used to generate the value to be saved
   *
   * @returns {Promise<any>}        resolves to the retrieved value or the generated value
   */
  remember (key, ttl, generator) {
    throw new NotImplementedError('remember');
  }

  /**
   * Retrieve the value from the cache. If key does not exists, the generator will
   * be used to create the value to be saved on the cache without expiration. After
   * saving, the generated value will be returned.
   *
   * @abstract
   * @async
   *
   * @param {string}    key       the key to identify the value saved
   * @param {() => any} generator the function used to generate the value to be saved
   *
   * @returns {Promise<any>}      resolves to the retrieved value or the generated value
   */
  rememberForever (key, generator) {
    throw new NotImplementedError('rememberForever');
  }
}

module.exports = Cache;
