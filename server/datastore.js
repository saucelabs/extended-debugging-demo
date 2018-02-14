export default class DataStore {
    constructor () {
        this.deleteAll()
    }

    save (data) {
        this.store.push(data)
    }

    delete (key) {
        delete this.store[key]
    }

    deleteAll () {
        this.store = []
    }

    get (key) {
        const values = []
        for (const [dbKey, value] of Object.entries(this.store)) {
            if (dbKey.startsWith(key)) {
                value.push(...value)
            }
        }

        return values
    }
}
