import ICache = require('./ICache');

/**
 * Stores the instances of ICache with its unique key.
 */
declare interface ICacheInstanceList {
  [key: string]: ICache;
}

export = ICacheInstanceList;
