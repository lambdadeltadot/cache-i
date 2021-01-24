# cache-i

A simple cache interface inspired by the one Laravel is using. This package includes the interface for the `Cache` and `CacheManager`.

## Installation

Using `npm`:

```bash
npm install @lambdadeltadot/cache-i
```

Using yarn:

```bash
yarn add @lambdadeltadot/cache-i
```

## Compatibility

Currently, this package is expected to be used only for node applications only with version `>=10.0.0`. This may not work on `browser` environments.

## Cache Manager

The cache manager stores the `Cache` instance to be used throughout your application.

### Usage

You can use the shared cache manager instance by importing the package.

```js
const manager = require('@lambdadeltadot/cache-i');
```

You can also create your own instance using `@lambdadeltadot/cache-i/CacheManager`.

```js
const CacheManager = require('@lambdadeltadot/cache-i/CacheManager');
const manager = new CacheManager();
```

If you are not satisfied with the current implementation of a method of the `CacheManager`, you can create a new class that extends `CacheManager` then override the method you want to override.

```js
const BaseCacheManager = require('@lambdadeltadot/cache-i/CacheManager');

class CacheManager extends BaseCacheManager {
  // override implementation here
}

const manager = new CacheManager();
```

You can also create your own implementation of the `CacheManager`, just create a class then extends it from `@lambdadeltadot/cache-i/Interface/CacheManager`. Check out the `Methods` section of the `CacheManager` for the methods to implement.

```js
const CacheManagerInterface = require('@lambdadeltadot/cache-i/Interface/CacheManager');

class CacheManager extends CacheManagerInterface {
  // your own implementation
}

const manager = new CacheManager();
```


### Methods

Below are the methods for the cache manager.

#### default ()

Get the default instance if it exists. Will get the first instance on the manager's list if default is not yet set.

- **Returns** `{Cache}`
- **Throws** `{RangeError}`: when the manager's list is empty
- **Throws** `{ReferenceError}`: when the currently set default key does not exists

```js
const defaultCache = manager.default();
defaultCache.get('code', null);
```

#### instance (key)

Get the instance with the given key.

- **Param** `{string} [key=null]`: the key of the instance to get, get the default instance if null
- **Returns** `{Cache}: the instance with the given key, or the default instance if given key is null
- **Throws** `{RangeError}`: when given key is null and the manager's list is empty
- **Throws** `{ReferenceError}`: when the given key is not null and that key does not exists on the list

```js
const defaultCache = manager.instance();
defaultCache.get('key', null);

const redisCache = manager.instance('redis');
redisCache.get('key', null);
```

#### isRegistered (key)

Checks if there is an instance registered with the given key.

- **Param** `{string} key`: the key to check
- **Returns** `{boolean}`: true if there is an instance registered with given key, otherwise false
- **Throws** `TypeError`: when given key is null

```js
if (manager.isRegistered('redis')) {
  const redisCache = manager.instance('redis');
  redisCache.get('key', null);
}
```

#### register (key, instance)

Add the cache instance to the list. This will replace existing instance on the given key if there is already an instance registered to that key.

- **Param** `{string} key`: the key where to register the given instance
- **Param** `{Cache} instance`: the instance to be registered
- **Returns** `{this}`: the cache manager for method chaining
- **Throws** `{TypeError}`: when the given key is null, or the given instance is not an instance of `Cache`

```js
manager.register('redis', new RedisCache())
  .register('file', new FileCache());
```

#### setDefault (key)

Sets the default key for this manager.

- **Param** `{null|string} key`: the key to set, or null to use the first key in the cache
- **Returns** `{this}`: the cache manager for method chaining
- **Throws** `{ReferenceError}`: when the setting key does not exists

```js
manager.register('redis', new RedisCache())
  .setDefault('redis')
  .default()
  .get('key', null);
```

#### unregister (key)

Removes the cache instance with the given key from the list.

- **Param** `{string} key`: the key to unregister
- **Returns** `{this}`: the cache manager for method chaining

```js
manager.unregister('redis');
```

## Cache

The interface to use for classes that can be registered to the cache manager.

### Usage

As this class is acting as an interface, you must create a class, extends it with the interface, then implements its method. After that you can create an instance of the newly created class then register it on the `CacheManager`.

```js
const Cache = require('@lambdadeltadot/cache-i/Interface/Cache');
const manager = require('@lambdadeltadot/cache-i');

class MemoryCache extends Cache {
  // method implementation here
}

const memoryCache = new MemoryCache();
manager.register('memory', memoryCache);
```

Note that all implementations must be `asynchronous`. This can be achieve by returning a promise:

```js
class MemoryCache extends Cache {
  constructor () {
    this._cache = {};
  }

  has (key) {
    return Promise.resolve(this._cache[key]);
  }
}
```

or declaring the method as `async`.

```js
const fs = require('fs').promises;

class FileCache extends Cache {
  async has (key) {
    const exists = await fs.exists(`${basePath}/${key}`);
    return exists;
  }
}
```

### Methods

Below are the methods of the `Cache` interface that you need to implement and their example usage.

#### add (key, value, ttl)

Add the given value if the key does not yet exists on the cache.

- **Param** `{string} key`: the key to identify the value saved
- **Param** `{any} value`: the value being saved
- **Param** `{number|Date} ttl`: the time to live in seconds or the date when the value will expire
- **Returns** `{Promise<boolean>}`: resolves to true if key not exists and successfully saved, or false if already exists

```js
cache.add('key', 'value', new Date(Date.now() + 60000))
  .then(added => console.log(added ? 'added' : 'already exists'));

cache.add('key', 'value', (Date.now() + 60000) / 1000)
  .then(added => console.log(added ? 'added' : 'already exists'));
```

#### decrement (key, amount)

Decrements the value on the cache with the given amount.

- **Param** `{string} key`: the key to identify the decrementing value
- **Param** `{number} [amount=1]`: the amount to decrement
- **Returns** `{number}`: resolves to the value after decrement

```js
cache.decrement('key')
  .then(newValue => console.log(newValue));

cache.decrement('key', 5)
  .then(newValue => console.log(newValue));
```

#### forever (key, value)

Adds the given value without expiration.

- **Param** `{string} key`: the key to identify the value saved
- **Param** `{any} value`: the value being saved
- **Returns** `{Promise<boolean>}`: resolves to true if successfully saved, otherwise false

```js
cache.forever('key', 'value')
  .then(success => console.log(success ? 'saved forever' : 'failed to save'));
```

#### forget (key)

Removes the entry with the given key.

- **Param** `{string} key`L the key of the entry to forget
- **Returns** `{Promise<boolean>}`: resolves to true if key exists and successfully removed, or false if key does not exists

```js
cache.forget('key')
  .then(isRemoved => console.log(isRemoved ? 'exists and removed' : 'already forgotten'));
```

#### get (key, defaultValue)

Retrieves the value with the given key.

- **Param** `{string} key`: the key to identify the value to retrieve
- **Param** `{any} [defaultValue]`: the value to return if key does not exists or is already expired
- **Returns** `{Promise<any>}`: resolves to the value retrieved, or the default value if key does not exists or is already expired

```js
cache.get('key', null)
  .then(value => console.log(value === null ? 'this is the default value' : 'value retrieved'));
```

#### has (key)

Determines whether the key exists on the cache and is not yet expired.

- **Param** `{string} key`: the key to check
- **Returns** `{Promise<boolean>}`: resolves to true if exists and is not yet expired, otherwise false

```js
cache.has('key')
  .then(exists => console.log(exists ? 'existing and not expired' : 'not existing or is expired'));
```

#### increment (key, value)

Increments the value on the cache with the given amount.

- **Param** `{string} key`: the key to identify the incrementing value
- **Param** `{number} [amount=1]`: the amount to increment
- **Returns** `{number}`: resolves to the value after increment

```js
cache.increment('key')
  .then(newValue => console.log(newValue));

cache.increment('key', 5)
  .then(newValue => console.log(newValue));
```

#### missing (key)

Determines whether the key does not exists.

- **Param** `{string} key`: the key to check
- **Returns** `{Promise<boolean>}`: resolves to true if not exists and or is expired, otherwise false

```js
cache.has('key')
  .then(missing => console.log(missing ? 'not existing or is expired' : 'existing and not expired'));
```

#### pull (key, defaultValue)

Remove the entry with the given key from the cache, then return that value of that entry.

- **Param** `{string} key`: the key of the entry to pull
- **Param** `{any} [defaultValue]`: the value to return if key does not exists or is already expired
- **Returns** `{Promise<any>}`: resolves to the value retrieved, or the default value if key does not exists or is already expired

```js
cache.pull('key', null)
  .then(value => console.log(value === null ? 'this is the default value' : 'value retrieved'));
```

#### put (key, value, ttl)

Sets the value on the cache.

- **Param** `{string} key`: the key to identify the value saved
- **Param** `{any} value`: the value being saved
- **Param** `{number|Date} ttl`: the time to live in seconds or the date when the value will expire
- **Returns** `{Promise<boolean>}`: resolves to true if successfully saved

```js
cache.put('key', 'value', new Date(Date.now() + 60000))
  .then(success => console.log(success ? 'successfully set' : 'failed to set');

cache.put('key', 'value', (Date.now() + 60000) / 1000)
  .then(success => console.log(success ? 'successfully set' : 'failed to set');
```

#### remember (key, ttl, generator)

Retrieve the value from the cache. If key does not exists, the generator will be used to create the value to be saved on the cache with the given ttl. After saving, the generated value will be returned.

- **Param** `{string} key`: the key to identify the value saved
- **Param** `{number|Date} ttl`: the time to live in seconds or the date when the value will expire
- **Param** `{() => any} generator`: the function used to generate the value to be saved
- **Returns** `{Promise<any>}`: resolves to the retrieved value or the generated value

```js
cache.remember('key', new Date(Date.now() + 60000), () => 'value')
  .then(value => console.log(value));

cache.remember('key', (Date.now() + 60000) / 1000, () => 'value')
  .then(console.log(value));
```

#### rememberForever (key, generator)

Retrieve the value from the cache. If key does not exists, the generator will be used to create the value to be saved on the cache without expiration. After saving, the generated value will be returned.

- **Param** `{string} key`: the key to identify the value saved
- **Param** `{() => any} generator`: the function used to generate the value to be saved
- **Returns** `{Promise<any>}`: resolves to the retrieved value or the generated value

```js
cache.rememberForever('key', () => 'value')
  .then(value => console.log(value));

cache.rememberForever('key', () => 'value')
  .then(console.log(value));
```

## Tests

```
npm run test
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
