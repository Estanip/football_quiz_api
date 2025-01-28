import { RedisService } from 'src/common/cache/redis.service';

export const clearCache = async (redisService: RedisService) => {
  await redisService.reset();
};
