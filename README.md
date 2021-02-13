# cache-i

A simple cache manager inspired by the one Laravel is using.

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

Currently, this package is expected to be used on engines that supports **ES6** `class`.


## Cache Manager

The cache manager stores the `Cache` implementations that will be used throughout your application.

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

### Methods

Below are the methods unique to `CacheManager`. The `CacheManager` also implements the `ICache` interface, it will just pass the call to the default registered instance.

#### getDefaultInstance ()

Get the default instance if it exists. Will get the first instance on the instance list if default instance key is not yet set.

- **Returns** `{ICache}`
- **Throws** `{RangeError}`: when the default key is not yet set and the list is empty
- **Throws** `{ReferenceError}`: when the currently set default key does not exists

```js
const defaultCache = manager.getDefaultInstance();
defaultCache.get('code', null);
```

#### getInstance (key)

Get the instance with the given key. If given key is null, returns the default instance.

- **Param** `{string} [key=null]`: the key of the instance to get
- **Returns** `{ICache}: the instance with the given key, or the default instance if given key is null
- **Throws** `{RangeError}`: when instance list is empty and given key is null
- **Throws** `{ReferenceError}`: when the given key is not null and that key does not exists on the list

```js
const defaultCache = manager.getInstance();
defaultCache.getInstance('key', null);

const memoryCache = manager.getInstance('memory');
memoryCache.get('key', null);
```

#### isRegistered (key)

Checks if there is an instance already registered under the given key.

- **Param** `{string} key`: the key to check
- **Returns** `{boolean}`: true if there is an instance registered with given key, otherwise false
- **Throws** `{TypeError}`: when given key is null

```js
if (manager.isRegistered('memory')) {
  const memoryCache = manager.getInstance('memory');
  memoryCache.get('key', null);
}
```

#### registerInstance (key, instance)

Adds the given cache instance to the list. This will replace the existing instance if there is already an instance registered to the given key.

- **Param** `{string} key`: the key where to register the given instance
- **Param** `{ICache} instance`: the instance to be registered
- **Returns** `{this}`
- **Throws** `{TypeError}`: when the given key is null

```js
manager.registerInstance('memory', new MemoryCache())
  .registerInstance('file', new FileCache());
```

#### setDefaultInstanceKey (key)

Sets the default instance key for this manager.

- **Param** `{null|string} key`: the key to set as default, use null to use the first instance on the instance list
- **Returns** `{this}`
- **Throws** `{ReferenceError}`: when the setting key does not exists

```js
manager.register('redis', new RedisCache())
  .setDefaultInstanceKey('redis')
  .getDefaultInstance()
  .get('key', null);
```

#### unregister (key)

Removes the cache instance with the given key from the list.

- **Param** `{string} key`: the key to unregister
- **Returns** `{this}`
- **Throws** `{TypeError}`: when the given key is null

```js
manager.unregister('redis');
```

## ICache

The interface for all Cache implementation.

### Usage

As this is just an interface, you just need to create a class or object implementing the methods of this interface. You can also just implement the methods you think you will use.

```js
class FileCache {
  add (key, value, ttl) {
    // add implementation here
  }

  // other method implementation here
}

manager.register('file', new FileCache());
```

```
const memoryCache = {
  add (key, value, ttl) {
  	// add implementation here
  }

  // other method implementation here
}

manager.register('memory', memoryCache);
```

Note that every method must return a `Promise`. You can also use `async` methods as they returns `Promise`.

```js
class MemoryCache extends Cache {
  constructor () {
    this._cache = {};
  }

  has (key) {
    return Promise.resolve(!!this._cache[key]);
  }

  async missing (key) {
    return !this._cache[key];
  }
}
```

### Methods To Implement

Below are the methods of the `ICache` interface that you need to implement and their example usage.

#### add (key, value, ttl)

Saves the given value if the identifying key does not have a value yet.

- **Generic Type** `{T}`: The type of the saving value.
- **Param** `{string} key`: the unique key to identify the saving value
- **Param** `{T} value`: the value to be saved
- **Param** `{number|Date} ttl`: the time to live in milliseconds, or the date when the value will expire
- **Returns** `{Promise<boolean>}`: a promise that resolves to true if key does not have a value yet and is successfully saved, or false if key already has value

```js
cache.add('key', 'value', new Date(Date.now() + 60000))
  .then(added => console.log(added ? 'added' : 'already exists'));

cache.add('key', 'value', (Date.now() + 60000) / 1000)
  .then(added => console.log(added ? 'added' : 'already exists'));
```

#### decrement (key, amount)

Decrements the value on the cache with the given amount.

- **Param** `{string} key`: the unique key to identify the saving value
- **Param** `{number} [amount=1]`: the amount to decrement
- **Returns** `{Promise<number>}`: a promise that resolves to the value after decrementing

```js
cache.decrement('key')
  .then(newValue => console.log(newValue));

cache.decrement('key', 5)
  .then(newValue => console.log(newValue));
```

#### forever (key, value)

Saves the given value without expiration.

- **Generic Type** `{T}`: The type of the saving value.
- **Param** `{string} key`: the unique key to identify the saving value
- **Param** `{T} value`: the value to be saved.
- **Returns** `{Promise<boolean>}`: a promise that resolves to true if successfully saved, otherwise false

```js
cache.forever('key', 'value')
  .then(success => console.log(success ? 'saved forever' : 'failed to save'));
```

#### forget (key)

Removes the value of the identifying key from the cache.

- **Param** `{string} key`: the key identifying the value to remove
- **Returns** `{Promise<boolean>}`: a promise that resolves to true if existing and successfully removed, or false if key already not in the cache

```js
cache.forget('key')
  .then(isRemoved => console.log(isRemoved ? 'exists and removed' : 'already forgotten'));
```

#### get (key, defaultValue)

Retrieves the value identified by the given key.

- **Generic Type** `{T}`: The type of the resolved value.
- **Param** `{string} key`: the key that identifies the value to retrieve
- **Param** `{T} [defaultValue]`: the value to return in case the key doesn't have a value
- **Returns** `{Promise<T>}`: a promise that resolves to the value retrieved, or the default value if key doesn't have a value

```js
cache.get('key', null)
  .then(value => console.log(value === null ? 'this is the default value' : 'value retrieved'));
```

#### has (key)

Determines whether the key has value.

- **Param** `{string} key`: the key to check
- **Returns** `{Promise<boolean>}`: a promise that resolves to true if has value, otherwise false

```js
cache.has('key')
  .then(exists => console.log(exists ? 'existing and not expired' : 'not existing or is expired'));
```

#### increment (key, value)

Increments the value on the cache with the given amount.

- **Param** `{string} key`: the unique key to identify the saving value
- **Param** `{number} [amount=1]`: the amount to increment
- **Returns** `{Promise<number>}`: a promise that resolves to the value after incrementing

```js
cache.increment('key')
  .then(newValue => console.log(newValue));

cache.increment('key', 5)
  .then(newValue => console.log(newValue));
```

#### missing (key)

Determines whether the key doesn't have a value.

- **Param** `{string} key`: the key to check
- **Returns** `{Promise<boolean>}`: a promise that resolves to true if doesn't have a value, otherwise false

```js
cache.has('key')
  .then(missing => console.log(missing ? 'not existing or is expired' : 'existing and not expired'));
```

#### pull (key, defaultValue)

Retrieves the value identified by the given key, then remove the value for that key on the cache.

- **Generic Type** `{T}`: The type of the resolved value.
- **Param** `{string} key`: the key that identifies the value to retrieve
- **Param** `{T} [defaultValue]`: the value to return in case the key doesn't have a value
- **Returns** `{Promise<T>}`: a promise that resolves to the value retrieved, or the default value if key doesn't have a value

```js
cache.pull('key', null)
  .then(value => console.log(value === null ? 'this is the default value' : 'value retrieved'));
```

#### put (key, value, ttl)

Saves the given value to the cache. Overwrite if existing.

- **Generic Type** `{T}`: The type of the saving value.
- **Param** `{string} key`: the unique key to identify the saving value
- **Param** `{T} value`: the value to be saved
- **Param** `{number|Date} ttl`: the time to live in milliseconds, or the date when the value will expire
- **Returns** `{Promise<boolean>}`: a promise that resolves to true if successfully saved, otherwise false

```js
cache.put('key', 'value', new Date(Date.now() + 60000))
  .then(success => console.log(success ? 'successfully set' : 'failed to set');

cache.put('key', 'value', (Date.now() + 60000) / 1000)
  .then(success => console.log(success ? 'successfully set' : 'failed to set');
```

#### remember (key, ttl, generator)

Retrieve the value from the cache. If the key doesn't have a value, the generator function will be used to create the value to be saved on the cache with the given ttl. After saving, the generated value will be returned.

- **Generic Type** `{T}`: The type of the retrieved or saved value.
- **Param** `{string} key`: the unique key to identify the retrieving and saving value
- **Param** `{number|Date} ttl`: the time to live in milliseconds or the date when the value will expire
- **Param** `{() => any} generator`: the function used to generate the value to be saved
- **Returns** `{Promise<any>}`: a promise that resolves to the retrieved value or the generated value

```js
cache.remember('key', new Date(Date.now() + 60000), () => 'value')
  .then(value => console.log(value));

cache.remember('key', (Date.now() + 60000) / 1000, () => 'value')
  .then(console.log(value));
```

#### rememberForever (key, generator)

Retrieve the value from the cache. If the key doesn't have a value, the generator function will be used to create the value to be saved on the cache forever. After saving, the generated value will be returned.

- **Generic Type** `{T}`: The type of the retrieved or saved value.
- **Param** `{string} key`: the unique key to identify the retrieving and saving value
- **Param** `{() => any} generator`: the function used to generate the value to be saved
- **Returns** `{Promise<any>}`: a promise that resolves to the retrieved value or the generated value

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
