export default class BushData {
    constructor () {
        this.data = [
            {
                name: 'single',
                probability: 0.6,
                frames: [
                    { ox: 2, oy: 5, ow: 5, oh: 2 },
                    { ox: 2, oy: 5, ow: 5, oh: 2 },
                    { ox: 2, oy: 5, ow: 5, oh: 2 }
                ]
            },
            {
                name: 'double',
                frames: [
                    { ox: 3, oy: 4, ow: 9, oh: 3 },
                    { ox: 3, oy: 4, ow: 9, oh: 3 }
                ]
            }
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