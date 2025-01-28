import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this._cacheManager.set(key, value, ttl || 0);
  }

  async get(key: string): Promise<any> {
    return await this._cacheManager.get(key);
  }
  async del(key: string): Promise<void> {
    await this._cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this._cacheManager.reset();
  }
}
