// models/Transport.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

class Transport {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.tripId = data.tripId;
        this.type = data.type;
        this.from = data.from;
        this.to = data.to;
        this.date = data.date;
        this.time = data.time;
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    static async getAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../data/transports.json'), 'utf8');
            const transports = JSON.parse(data);
            return transports.map(transport => new Transport(transport));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async getById(id) {
        const transports = await this.getAll();
        return transports.find(transport => transport.id === id);
    }

    static async getByTripId(tripId) {
        const transports = await this.getAll();
        return transports.filter(transport => transport.tripId === tripId);
    }

    async save() {
        const transports = await Transport.getAll();
        const index = transports.findIndex(transport => transport.id === this.id);
        
        if (index >= 0) {
            transports[index] = this;
        } else {
            transports.push(this);
        }
        
        await this._saveToFile(transports);
        return this;
    }

    static async delete(id) {
        const transports = await this.getAll();
        const filteredTransports = transports.filter(transport => transport.id !== id);
        await Transport._saveToFile(filteredTransports);
    }

    static async deleteByTripId(tripId) {
        const transports = await this.getAll();
        const filteredTransports = transports.filter(transport => transport.tripId !== tripId);
        await Transport._saveToFile(filteredTransports);
    }

    static async _saveToFile(transports) {
        const dir = path.join(__dirname, '../data');
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(
            path.join(dir, 'transports.json'),
            JSON.stringify(transports, null, 2)
        );
    }

    async _saveToFile(transports) {
        await Transport._saveToFile(transports);
    }
}

module.exports = Transport;
