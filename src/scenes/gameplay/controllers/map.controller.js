import Chunk from '../components/map/chunk';

export default class MapController {
    constructor (scene) {
        this.scene = scene;

        this.chunks = [];
    }

    createChunk (x, y) {
        this.chunks.push(new Chunk(this.scene, x, y));
    }

    updateChunks (player) {
        const px = player.sprite.x;
        const py = player.sprite.y;

        const chunkX = Math.floor(px / 64);
        const chunkY = Math.floor(py / 64);

        // Changed chunk - generate or load
        if (chunkX !== this.preChunkX || chunkY !== this.preChunkY) {
            // Unload old ones
            if (this.preChunkX !== undefined && this.preChunkY !== undefined) {
                // TODO
            }

            // Create or load new chunks
            for (let iy = -1; iy <= 1; iy++) {
                const targetChunkY = chunkY + iy;
                for (let ix = -1; ix <= 1; ix++) {
                    const targetChunkX = chunkX + ix;

                    // Load given chunk
                    const chunk = this.chunks.find(c => c.x === targetChunkX && c.y === targetChunkY);
                
                    // If chunk exists - load it, otherwise create new one
                    if (chunk) {
                        chunk.show();
                    } else {
                        this.createChunk(targetChunkX, targetChunkY);
                        console.info('Created chunk at [', targetChunkX, ', ', targetChunkY, ']');
                    }
                }
            }
            
            // Update previous chunks
            this.preChunkX = chunkX;
            this.preChunkY = chunkY;
        }
    }
}