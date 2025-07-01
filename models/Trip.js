// models/Trip.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

class Trip {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.name = data.name;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.description = data.description || '';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    static async getAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../data/trips.json'), 'utf8');
            const trips = JSON.parse(data);
            return trips.map(trip => new Trip(trip));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async getById(id) {
        const trips = await this.getAll();
        return trips.find(trip => trip.id === id);
    }

    async save() {
        const trips = await Trip.getAll();
        const index = trips.findIndex(trip => trip.id === this.id);
        
        if (index >= 0) {
            this.updatedAt = new Date().toISOString();
            trips[index] = this;
        } else {
            trips.push(this);
        }
        
        await this._saveToFile(trips);
        return this;
    }

    static async delete(id) {
        const trips = await this.getAll();
        const filteredTrips = trips.filter(trip => trip.id !== id);
        await Trip._saveToFile(filteredTrips);
        
        // Usuń również powiązane elementy
        const Place = require('./Place');
        const Hotel = require('./Hotel');
        const Transport = require('./Transport');
        
        await Place.deleteByTripId(id);
        await Hotel.deleteByTripId(id);
        await Transport.deleteByTripId(id);
    }

    static async _saveToFile(trips) {
        const dir = path.join(__dirname, '../data');
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(
            path.join(dir, 'trips.json'),
            JSON.stringify(trips, null, 2)
        );
    }

    async _saveToFile(trips) {
        await Trip._saveToFile(trips);
    }
}

module.exports = Trip;