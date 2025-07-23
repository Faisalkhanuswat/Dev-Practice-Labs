const merge = <T extends object, U extends object>(obj1: T, obj2: U) => {
    return Object.assign(obj1, obj2)
}


const promise: Promise<object> = new Promise((resolve, reject) => {
    const m = merge({ Name: "Faisal" }, { Age: 22 });
    if (!m) {
        reject('error occur while merging')
    }
    setTimeout(() => {
        resolve(m);
    }, 3000)
})

promise.then(data => {
    console.log(data)
}).catch(e => {
    console.error(e)
})


// class generics

class StorageBox<T> {
    private data: T[] = [];

    addItem = (item: T) => {
        this.data.push(item)
    }

    removeItem = (item: T) => {
        const i = this.data.indexOf(item);
        if (i === -1) {
            return
        }

        this.data.splice(i, 1);
    }

    getItems = () => {
        return console.log(this.data);
    }

}

const storage = new StorageBox<string>();
storage.addItem("Faisal");
storage.addItem("Khan");
storage.removeItem("Faisal");
storage.getItems()

const storagea = new StorageBox<number>();
storagea.addItem(1);
storagea.addItem(2);
storagea.removeItem(3);
storagea.getItems()