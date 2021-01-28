"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
class Cache {
    constructor(seconds) {
        this.cache = new node_cache_1.default({ stdTTL: 0, checkperiod: seconds, useClones: false });
    }
    get(key, storeFunction) {
        const value = this.cache.get(key);
        if (value) {
            return Promise.resolve(value);
        }
        return storeFunction().then((result) => {
            this.cache.set(key, result);
            return result;
        });
    }
    del(keys) {
        this.cache.del(keys);
    }
    flush() {
        this.cache.flushAll();
    }
}
exports.default = Cache;
//# sourceMappingURL=Cache.js.map