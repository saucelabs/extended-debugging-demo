export default class DataStore {
    constructor () {
        this.deleteAll()
    }

    save (data) {
        data.id = this.store.size
        this.store.set(data.id, data)
        console.log('Save todo to store', this.store)
    }

    delete (key) {
        const success = this.store.delete(key)
        console.log(`Deleted todo with key ${key} ${success ? 'successfully' : 'not successfully'}`)
    }

    deleteAll () {
        this.store = new Map()
        console.log('Cleared data store')
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
        console.log(`Update todo with key ${key}: ${data}`)
    }

    getAll () {
        const entries = []
        for (const data of this.store) {
            entries.push(data[1])
        }
        return entries
    }
}
