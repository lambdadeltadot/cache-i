/**
 * Get the instance with the given key from the given list.
 *
 * @param {import('@lambdadeltadot/cache-i').CacheInstanceList} list the list where we resolve the instance
 * @param {string} key the key used to identify the instance
 *
 * @returns {import('@lambdadeltadot/cache-i').ICache} the instance resolved
 *
 * @throws {ReferenceError} when the key doesn't have an instance to it
 */
module.exports = (list, key) => {
  if (!list[key]) {
    throw new ReferenceError(`instance with key "${key}" does not exists`);
  }

  return list[key];
};
