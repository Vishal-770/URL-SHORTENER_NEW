import { createClient } from "redis";

/**
 * Redis Singleton Client
 * 
 * Implements a globally shared Redis connection to prevent
 * exhaustion of connection pools during Next.js hot-reloads.
 */

const redisClientFactory = () => {
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  const password = process.env.REDIS_PASSWORD;
  const username = process.env.REDIS_USERNAME || "default";

  if (!host || !port || !password) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Redis configuration missing in environment variables.");
    }
    return null;
  }

  const client = createClient({
    username,
    password,
    socket: {
      host,
      port: parseInt(port),
      reconnectStrategy: (retries) => {
        if (retries > 10) return new Error("Redis reconnection failed after 10 retries");
        return Math.min(retries * 50, 500);
      }
    }
  });

  client.on("error", (err) => console.error("Redis Client Error:", err));
  client.on("connect", () => console.log("✅ Redis Client Connected"));

  // Start the connection immediately but don't await here 
  // (client handles queuing until connection is ready)
  client.connect().catch((err) => {
    console.error("Failed to connect to Redis during initialization:", err);
  });

  return client;
};

type RedisClientSingleton = ReturnType<typeof redisClientFactory>;

const globalForRedis = globalThis as unknown as {
  redis: RedisClientSingleton;
};

export const redis = globalForRedis.redis ?? redisClientFactory();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export default redis;
