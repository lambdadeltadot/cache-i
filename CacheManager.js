const BaseCacheManager = require('./Interface/CacheManager');
const Cache = require('./Interface/Cache');

/**
 * Manages multiple cache instances.
 *
 * @extends {BaseCacheManager}
 */
class CacheManager extends BaseCacheManager {
  /**
   * Creates an instance.
   */
  constructor () {
    super();

    /**
     * The key of the instance that will be used as the
     * default one.
     *
     * @protected
     *
     * @type {null|string}
     */
    this._default = null;

    /**
     * The list of instances.
     *
     * @protected
     *
     * @type {{[key: string]: import('./Interface/Cache')}}
     */
    this._list = {};
  }

  /**
   * @inheritdoc
   *
   * @throws {RangeError}     when the manager's list is empty
   * @throws {ReferenceError} when the currently set default key does not exists
   */
  default () {
    if (this._default === null) {
      for (const key in this._list) { // eslint-disable-line no-unreachable-loop
        return this._list[key];
      }

      throw new RangeError('list is empty');
    }

    return this._get(this._default);
  }

  /**
   * @inheritdoc
   *
   * @throws {RangeError}     when given key is null and the manager's list is empty
   * @throws {ReferenceError} when the given key is not null and that key does not exists on the list
   */
  instance (key = null) {
    if (key === null) {
      return this.default();
    }

    return this._get(key);
  }

  /**
   * @inheritdoc
   *
   * @throws {TypeError}  when given key is null
   */
  isRegistered (key) {
    if (key === null) {
      throw new TypeError('key cannot be null');
    }

    return !!this._list[key];
  }

  /**
   * @inheritdoc
   *
   * @throws {TypeError} when the given key is null, or the given instance is not an instance of `Cache`
   */
  register (key, instance) {
    if (key === null) {
      throw new TypeError('key cannot be null');
    }

    if (!(instance instanceof Cache)) {
      throw new TypeError('instance should be an instance of Cache');
    }

    this._list[key] = instance;
    return this;
  }

  /**
   *  @inheritdoc
   *
   * @throws {ReferenceError} when the setting key does not exists
   */
  setDefault (key) {
    if (key === null || this.isRegistered(key)) {
      this._default = key;
      return this;
    }

    throw new ReferenceError(`instance with key "${key}" is not registered`);
  }

  /**
   * @inheritdoc
   *
   * @throws {TypeError} if key is null
   */
  unregister (key) {
    if (key === null) {
      throw new TypeError('key cannot be null');
    }

    delete this._list[key];
    return this;
  }

  /**
   * Get the instance with key.
   *
   * @protected
   *
   * @param {string} key                      the key of the instance to get
   *
   * @returns {import('./Interface/Cache')}
   *
   * @throws {ReferenceError}                 when no instance registered with the given key
   * @throws {TypeError}                      if key is null
   */
  _get (key) {
    if (this.isRegistered(key)) {
      return this._list[key];
    }

    throw new ReferenceError(`instance with key "${key}" is not registered`);
  }
}

module.exports = CacheManager;
