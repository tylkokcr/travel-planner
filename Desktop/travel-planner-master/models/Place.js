const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

class Place {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.tripId = data.tripId;
        this.name = data.name;
        this.address = data.address;
        this.description = data.description || '';
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    static async getAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../data/places.json'), 'utf8');
            const places = JSON.parse(data);
            return places.map(place => new Place(place));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async getById(id) {
        const places = await this.getAll();
        return places.find(place => place.id === id);
    }

    static async getByTripId(tripId) {
        const places = await this.getAll();
        return places.filter(place => place.tripId === tripId);
    }

    async save() {
        const places = await Place.getAll();
        const index = places.findIndex(place => place.id === this.id);
        
        if (index >= 0) {
            places[index] = this;
        } else {
            places.push(this);
        }
        
        await this._saveToFile(places);
        return this;
    }

    static async delete(id) {
        const places = await this.getAll();
        const filteredPlaces = places.filter(place => place.id !== id);
        await Place._saveToFile(filteredPlaces);
    }

    static async deleteByTripId(tripId) {
        const places = await this.getAll();
        const filteredPlaces = places.filter(place => place.tripId !== tripId);
        await Place._saveToFile(filteredPlaces);
    }

    static async _saveToFile(places) {
        const dir = path.join(__dirname, '../data');
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(
            path.join(dir, 'places.json'),
            JSON.stringify(places, null, 2)
        );
    }

    async _saveToFile(places) {
        await Place._saveToFile(places);
    }
}

module.exports = Place;