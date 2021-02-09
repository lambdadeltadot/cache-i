declare module '@lambdadeltadot/cache-i' {
  /**
   * The interface for all Cache implementation.
   */
  export interface ICache {
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
