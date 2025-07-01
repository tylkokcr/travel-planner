// models/User.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

class User {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.username = data.username;
        this.email = data.email;
        this.password = data.password; // Hashlenmiş şifre
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    static async getAll() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8');
            const users = JSON.parse(data);
            return users.map(user => new User(user));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async getById(id) {
        const users = await this.getAll();
        return users.find(user => user.id === id);
    }

    static async getByUsername(username) {
        const users = await this.getAll();
        return users.find(user => user.username === username);
    }

    static async getByEmail(email) {
        const users = await this.getAll();
        return users.find(user => user.email === email);
    }

    async save() {
        const users = await User.getAll();
        const index = users.findIndex(user => user.id === this.id);
        
        if (index >= 0) {
            users[index] = this;
        } else {
            // Yeni kullanıcı ise şifreyi hashle
            if (!this.password.startsWith('$2a$')) {
                this.password = await bcrypt.hash(this.password, 10);
            }
            users.push(this);
        }
        
        await this._saveToFile(users);
        return this;
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    static async _saveToFile(users) {
        const dir = path.join(__dirname, '../data');
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(
            path.join(dir, 'users.json'),
            JSON.stringify(users, null, 2)
        );
    }

    async _saveToFile(users) {
        await User._saveToFile(users);
    }
}

module.exports = User;