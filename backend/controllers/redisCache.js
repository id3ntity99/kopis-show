const redis = require("redis");
require("dotenv").config();

class Cache {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_SERVER);
  }

  async connectServer() {
    await this.client.connect();
  }

  async setCache(key, value) {
    await this.client.set(key, value);
  }

  async getCache(key) {
    await this.client.get(key);
  }

  async does_exist(key) {
    const cacheData = await this.getCache(key);
    if (typeof cacheData === "undefined") {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Cache;
