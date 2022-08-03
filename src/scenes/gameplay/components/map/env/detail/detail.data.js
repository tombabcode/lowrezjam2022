export default class DetailData {
    constructor () {
        this.data = [
            {
                name: 'stones',
                probability: 0.2,
                frames: 4
            },
            {
                name: 'grass',
                probability: 0.2,
                frames: 12
            },
            {
                name: 'ground',
                frames: 10
            },
        ]
    }

    getRandom () {
        for (let i = 0; i < this.data.length - 1; i++) {
            const rand = Math.random();
            if (rand < this.data[i].probability)
                return this.data[i];
        }

        return this.data[this.data.length - 1];
    }

    get (name) {
        return this.data.find(v => v.name == name);
    }
}