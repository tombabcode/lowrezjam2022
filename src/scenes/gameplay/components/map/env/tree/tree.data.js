export default class TreeData {
    constructor () {
        this.data = [
            {
                name: 'dead',
                probability: 0.2,
                frames: [
                    { ox: 2, oy: 13, ow: 4, oh: 2 },
                    { ox: 2, oy: 13, ow: 4, oh: 2 },
                    { ox: 2, oy: 13, ow: 4, oh: 2 },
                    { ox: 2, oy: 13, ow: 4, oh: 2 }
                ]
            },
            {
                name: 'cluster-m',
                probability: 0.2,
                frames: [
                    { ox: 1, oy: 6, ow: 14, oh: 6 }
                ]
            },
            {
                name: 'cluster-l',
                probability: 0.1,
                frames: [
                    { ox: 1, oy: 5, ow: 15, oh: 13 }
                ]
            },
            {
                name: 'multi-y',
                probability: 0.05,
                frames: [
                    { ox: 1, oy: 11, ow: 6, oh: 12 }
                ]
            },
            {
                name: 'single',
                frames: [
                    { ox: 1, oy: 13, ow: 5, oh: 2 },
                    { ox: 1, oy: 13, ow: 5, oh: 2 },
                    { ox: 1, oy: 13, ow: 6, oh: 2 },
                    { ox: 1, oy: 13, ow: 6, oh: 2 },
                    { ox: 1, oy: 13, ow: 6, oh: 2 }
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