import NodeCache from 'node-cache'

class Cache {
    cache: NodeCache

    constructor(seconds: number) {
        this.cache = new NodeCache({ stdTTL: 0, checkperiod: seconds, useClones: false })
    }

    get(key: string, storeFunction: () => Promise<string>) {
        const value = this.cache.get(key)
        if (value) {
            return Promise.resolve(value)
        }

        return storeFunction().then((result: string) => {
            this.cache.set(key, result)
            return result
        })
    }

    del(keys: string[]) {
        this.cache.del(keys)
    }

    flush() {
        this.cache.flushAll()
    }
}


export default Cache;