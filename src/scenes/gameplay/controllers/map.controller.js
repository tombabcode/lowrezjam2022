import Chunk from '../components/map/chunk';

export default class MapController {
    constructor (scene) {
        this.scene = scene;
        this.reset();
    }

    reset () {
        this.visibleChunks = [];
        if (this.chunks) {
            this.chunks.forEach(v => v.reset());
        }
        this.chunks = [];
    }

    createChunk (x, y) {
        const chunk = new Chunk(this.scene, x, y);
        this.chunks.push(chunk);
        return chunk;
    }

    updateChunks (player, time) {
        const px = player.sprite.x;
        const py = player.sprite.y;

        const chunkX = Math.floor(px / 64);
        const chunkY = Math.floor(py / 64);

        // Changed chunk - generate or load
        if (chunkX !== this.preChunkX || chunkY !== this.preChunkY) {
            const newVisibleChunks = [];

            // Create or load new chunks
            for (let iy = -1; iy <= 1; iy++) {
                const targetChunkY = chunkY + iy;
                for (let ix = -1; ix <= 1; ix++) {
                    const targetChunkX = chunkX + ix;

                    // Load given chunk
                    let chunk = this.chunks.find(c => c.x === targetChunkX && c.y === targetChunkY);
                
                    // If chunk exists - load it, otherwise create new one
                    if (chunk)
                        chunk.show();
                    else
                        chunk = this.createChunk(targetChunkX, targetChunkY);

                    newVisibleChunks.push(chunk);
                }
            }

            // Unload non-used chunks
            for (let i = 0; i < this.visibleChunks.length; i++) {
                // If chunk is not in use (is old) then hide it
                const chunkID = newVisibleChunks.findIndex(chunk => chunk === this.visibleChunks[i]);
                if (chunkID === -1) {
                    this.visibleChunks[i].hide();
                    this.visibleChunks.splice(i, 1);
                    i--;
                }
            }

            // Add chunks that was added
            for (let i = 0; i < newVisibleChunks.length; i++) {
                const chunkID = this.visibleChunks.findIndex(chunk => chunk === newVisibleChunks[i]);
                if (chunkID === -1)
                    this.visibleChunks.push(newVisibleChunks[i]);
            }

            // Update previous chunks
            this.preChunkX = chunkX;
            this.preChunkY = chunkY;
        }

        // Update
        if (this.visibleChunks)
            this.visibleChunks.forEach(chunk => chunk.update(time));
    }
}