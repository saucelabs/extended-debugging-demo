export default class DataStore {
    constructor () {
        this.deleteAll()
    }

    save (data) {
        data.id = this.store.size
        this.store.set(data.id, data)
    }

    delete (key) {
        this.store.delete(key)
    }

    deleteAll () {
        this.store = new Map()
    }

    deleteComplete () {
        for (const [id, data] of this.store) {
            if (data.completed) this.delete(id)
        }
    }

    get (key) {
        return this.store.get(key)
    }

    update (key, data) {
        this.store.set(key, data)
    }

    getAll () {
        const entries = []
        for (const [id, data] of this.store) {
            entries.push(data)
        }
        return entries
    }
}
