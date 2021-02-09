declare module '@lambdadeltadot/cache-i' {
  /**
   * Manages multiple cache instances.
   */
  export class ICacheManager implements ICache {
    /**
     * The key of the instance that will be used as the default one.
     */
    protected _defaultInstanceKey: null|string;

    /**
     * The list of cache instance registered to this manager.
     */
    protected _instanceList: ICacheInstanceList;

    /**
     * Get the default instance if it exists. Will get the first
     * instance on the instance list if default instance key is
     * not yet set.
     *
     * @throws {RangeError} when instance list is empty and default instance key is not yet set
     * @throws {ReferenceError} when the currently set default key does not exists
     */
    getDefaultInstance(): ICache;

    /**
     * Get the instance with the given key. If given key is null, returns the
     * default instance.
     *
     * @param key the key of the instance to get
     *
     * @returns the instance with the given key, or the default instance if given key is null
     *
     * @throws {RangeError} when instance list is empty and given key is null
     * @throws {ReferenceError} when the given key does not exist
     */
    getInstance(key?: string): ICache;

    /**
     * Checks if there is an instance already registered under the given key.
     *
     * @param key the key to check
     *
     * @returns true if there is, otherwise false
     *
     * @throws {TypeError} when given key is null
     */
    isRegistered(key: string): boolean;

    /**
     * Adds the given cache instance to the list. This will replace the existing
     * instance if there is already an instance registered to the given key.
     *
     * @param {string} key the key where to register the instance
     * @param {ICache} instance the instance to register
     *
     * @throws {ReferenceError} when the given key is null
     */
    registerInstance(key: string, instance: ICache): this;

    /**
     * Sets the default instance key for this manager.
     *
     * @param key the key to set as default, use null to use the first instance on the instance list
     *
     * @throws {ReferenceError} when the given key does not exists
     */
    setDefaultInstanceKey(key: null|string): this;

    /**
     * Removes the cache instance with the given key from the list.
     *
     * @param key the key to unregister
     *
     * @throws {TypeError} when the given key is null
     */
    unregisterInstance(key: string): this;

    // ================================================================================
    // DEFAULT CACHE INTERFACE IMPLEMENTATION
    // ================================================================================

    /**
     * Saves the given value if the identifying key does not have a value yet.
     *
     * @param key the unique key to identify the saving value
     * @param value the value to be saved
     * @param ttl the time to live in milliseconds, or the date when the value will expire
     *
     * @returns a promise that resolves to true if key does not have a value yet and is successfully saved, or false if key already has value
     */
    add<T> (key: string, value: T, ttl: number|Date): Promise<boolean>;

    /**
     * Decrements the value on the cache with the given amount.
     *
     * @param key the unique key to identify the saving value
     * @param amount the amount to decrement
     *
     * @returns a promise that resolves to the value after decrementing
     */
    decrement (key: string, amount?: number): Promise<number>;

    /**
     * Saves the given value without expiration.
     *
     * @param key the unique key to identify the saving value
     * @param value the value to be saved
     *
     * @returns a promise that resolves to true if successfully saved, otherwise false
     */
    forever<T> (key: string, value: T): Promise<boolean>;

    /**
     * Removes the value of the identifying key from the cache.
     *
     * @param key the key identifying the value to remove
     *
     * @returns a promise that resolves to true if existing and successfully removed, or false if key already not in the cache
     */
    forget (key: string): Promise<boolean>;

    /**
     * Retrieves the value identified by the given key.
     *
     * @param key the key that identifies the value to retrieve
     * @param defaultValue the value to return in case the key doesn't have a value
     *
     * @returns a promise that resolves to the value retrieved, or the default value if key doesn't have a value
     */
    get<T> (key: string, defaultValue?: T): Promise<T>;

    /**
     * Determines whether the key has value.
     *
     * @param key the key to check
     *
     * @returns a promise that resolves to true if has value, otherwise false
     */
    has (key: string): Promise<boolean>;

    /**
     * Increments the value on the cache with the given amount.
     *
     * @param key the unique key to identify the saving value
     * @param amount the amount to increment
     *
     * @returns a promise that resolves to the value after incrementing
     */
    increment (key: string, amount?: number): Promise<number>;

    /**
     * Determines whether the key doesn't have a value
     *
     * @param key the key to check
     *
     * @returns a promise that resolves to true if doesn't have a value, otherwise false
     */
    missing (key: string): Promise<boolean>;

    /**
     * Retrieves the value identified by the given key, then remove the value for
     * that key on the cache.
     *
     * @param key the key that identifies the value to retrieve
     * @param defaultValue the value to return in case the key doesn't have a value
     *
     * @returns a promise that resolves to the value retrieved, or the default value if key doesn't have a value
     */
    pull<T> (key: string, defaultValue?: T): Promise<T>;

    /**
     * Saves the given value to the cache.
     *
     * @param key the unique key to identify the saving value
     * @param value the value to be saved
     * @param ttl the time to live in milliseconds, or the date when the value will expire
     *
     * @returns a promise that resolves to true if successfully saved, otherwise false
     */
    put<T> (key: string, value: T, ttl: number|Date): Promise<boolean>;

    /**
     * Retrieve the value from the cache. If the key doesn't have a value, the generator
     * function will be used to create the value to be saved on the cache with the given
     * ttl. After saving, the generated value will be returned.
     *
     * @param key the unique key to identify the retrieving and saving value
     * @param ttl the time to live in seconds or the date when the value will expire
     * @param generator the function used to generate the value to be saved
     *
     * @returns a promise that resolves to the retrieved value or the generated value
     */
    remember<T> (key: string, ttl: number|Date, generator: () => T): Promise<T>;

    /**
     * Retrieve the value from the cache. If the key doesn't have a value, the generator
     * function will be used to create the value to be saved on the cache forever. After
     * saving, the generated value will be returned.
     *
     * @param key the unique key to identify the retrieving and saving value
     * @param generator the function used to generate the value to be saved
     *
     * @returns a promise that resolves to the retrieved value or the generated value
     */
    rememberForever<T> (key: string, generator: () => T): Promise<T>;
  }
}
