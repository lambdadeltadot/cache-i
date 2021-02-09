declare module '@lambdadeltadot/cache-i' {
  /**
   * Stores the saved instances. Used by the cache manager.
   */
  export interface ICacheInstanceList {
    [key: string]: ICache;
  }
}
