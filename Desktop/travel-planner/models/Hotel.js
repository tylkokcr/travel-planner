// models/Hotel.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

class Hotel {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.tripId = data.tripId;
        this.name = data.name;
        this.address = data.address;
        this.checkIn = data.checkIn;
        this.checkOut = data.checkOut;
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    static async getAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../data/hotels.json'), 'utf8');
            const hotels = JSON.parse(data);
            return hotels.map(hotel => new Hotel(hotel));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async getById(id) {
        const hotels = await this.getAll();
        return hotels.find(hotel => hotel.id === id);
    }

    static async getByTripId(tripId) {
        const hotels = await this.getAll();
        return hotels.filter(hotel => hotel.tripId === tripId);
    }

    async save() {
        const hotels = await Hotel.getAll();
        const index = hotels.findIndex(hotel => hotel.id === this.id);
        
        if (index >= 0) {
            hotels[index] = this;
        } else {
            hotels.push(this);
        }
        
        await this._saveToFile(hotels);
        return this;
    }

    static async delete(id) {
        const hotels = await this.getAll();
        const filteredHotels = hotels.filter(hotel => hotel.id !== id);
        await Hotel._saveToFile(filteredHotels);
    }

    static async deleteByTripId(tripId) {
        const hotels = await this.getAll();
        const filteredHotels = hotels.filter(hotel => hotel.tripId !== tripId);
        await Hotel._saveToFile(filteredHotels);
    }

    static async _saveToFile(hotels) {
        const dir = path.join(__dirname, '../data');
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(
            path.join(dir, 'hotels.json'),
            JSON.stringify(hotels, null, 2)
        );
    }

    async _saveToFile(hotels) {
        await Hotel._saveToFile(hotels);
    }
}

module.exports = Hotel;