// scripts/seed-data.js
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

async function seedData() {
    const dataDir = path.join(__dirname, '../data');
    
    // Data klasörünü oluştur
    await fs.mkdir(dataDir, { recursive: true });
    
    // Örnek kullanıcılar
    const users = [
        {
            id: uuidv4(),
            username: 'demo',
            email: 'demo@travel.com',
            password: await bcrypt.hash('demo123', 10),
            createdAt: new Date().toISOString()
        }
    ];
    
    // Örnek geziler
    const trips = [
        {
            id: 'trip-1',
            name: 'İtalya Turu',
            startDate: '2024-07-15',
            endDate: '2024-07-25',
            description: 'Roma, Floransa ve Venedik\'i kapsayan muhteşem bir İtalya turu. Tarihi yerler, sanat ve lezzetli yemekler bizi bekliyor!',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'trip-2',
            name: 'Uzak Doğu Macerası',
            startDate: '2024-09-10',
            endDate: '2024-09-25',
            description: 'Japonya ve Güney Kore\'yi kapsayan kültür turu. Modern şehirler ve geleneksel tapınaklar.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'trip-3',
            name: 'Kapadokya Keşfi',
            startDate: '2024-05-01',
            endDate: '2024-05-05',
            description: 'Peri bacaları, balon turu ve tarihi yeraltı şehirleri ile büyüleyici Kapadokya.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
    
    // Örnek yerler
    const places = [
        // İtalya Turu
        {
            id: uuidv4(),
            tripId: 'trip-1',
            name: 'Kolezyum',
            address: 'Piazza del Colosseo, 1, 00184 Roma RM, İtalya',
            description: 'Roma İmparatorluğu\'nun en büyük amfitiyatrosu',
            createdAt: new Date().toISOString()
        },
        {
            id: uuidv4(),
            tripId: 'trip-1',
            name: 'Uffizi Galerisi',
            address: 'Piazzale degli Uffizi, 6, 50122 Firenze FI, İtalya',
            description: 'Rönesans sanatının en önemli koleksiyonu',
            createdAt: new Date().toISOString()
        },
        {
            id: uuidv4(),
            tripId: 'trip-1',
            name: 'San Marco Meydanı',
            address: 'Piazza San Marco, 30100 Venezia VE, İtalya',
            description: 'Venedik\'in kalbi, muhteşem bazilikası ile ünlü',
            createdAt: new Date().toISOString()
        },
        // Uzak Doğu
        {
            id: uuidv4(),
            tripId: 'trip-2',
            name: 'Senso-ji Tapınağı',
            address: '2 Chome-3-1 Asakusa, Taito City, Tokyo, Japonya',
            description: 'Tokyo\'nun en eski Budist tapınağı',
            createdAt: new Date().toISOString()
        },
        {
            id: uuidv4(),
            tripId: 'trip-2',
            name: 'Gyeongbokgung Sarayı',
            address: '161 Sajik-ro, Jongno-gu, Seoul, Güney Kore',
            description: 'Joseon Hanedanlığı\'nın ana sarayı',
            createdAt: new Date().toISOString()
        },
        // Kapadokya
        {
            id: uuidv4(),
            tripId: 'trip-3',
            name: 'Göreme Açık Hava Müzesi',
            address: 'Göreme, 50180 Nevşehir',
            description: 'UNESCO Dünya Mirası, kaya kiliseleri',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Örnek oteller
    const hotels = [
        // İtalya
        {
            id: uuidv4(),
            tripId: 'trip-1',
            name: 'Hotel Artemide',
            address: 'Via Nazionale, 22, 00184 Roma RM, İtalya',
            checkIn: '2024-07-15',
            checkOut: '2024-07-18',
            createdAt: new Date().toISOString()
        },
        {
            id: uuidv4(),
            tripId: 'trip-1',
            name: 'Hotel Savoy',
            address: 'Piazza della Repubblica, 7, 50123 Firenze FI, İtalya',
            checkIn: '2024-07-18',
            checkOut: '2024-07-21',
            createdAt: new Date().toISOString()
        },
        // Uzak Doğu
        {
            id: uuidv4(),
            tripId: 'trip-2',
            name: 'Park Hyatt Tokyo',
            address: '3-7-1-2 Nishi-Shinjuku, Tokyo',
            checkIn: '2024-09-10',
            checkOut: '2024-09-17',
            createdAt: new Date().toISOString()
        },
        // Kapadokya
        {
            id: uuidv4(),
            tripId: 'trip-3',
            name: 'Museum Hotel',
            address: 'Tekeli Mah. No:1, 50240 Uçhisar/Nevşehir',
            checkIn: '2024-05-01',
            checkOut: '2024-05-05',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Örnek ulaşım
    const transports = [
        // İtalya
        {
            id: uuidv4(),
            tripId: 'trip-1',
            type: 'Uçak',
            from: 'İstanbul',
            to: 'Roma',
            date: '2024-07-15',
            time: '10:30',
            createdAt: new Date().toISOString()
        },
        {
            id: uuidv4(),
            tripId: 'trip-1',
            type: 'Tren',
            from: 'Roma',
            to: 'Floransa',
            date: '2024-07-18',
            time: '14:00',
            createdAt: new Date().toISOString()
        },
        // Uzak Doğu
        {
            id: uuidv4(),
            tripId: 'trip-2',
            type: 'Uçak',
            from: 'İstanbul',
            to: 'Tokyo',
            date: '2024-09-10',
            time: '01:35',
            createdAt: new Date().toISOString()
        },
        // Kapadokya
        {
            id: uuidv4(),
            tripId: 'trip-3',
            type: 'Uçak',
            from: 'İstanbul',
            to: 'Nevşehir',
            date: '2024-05-01',
            time: '07:00',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Dosyaları kaydet
    await fs.writeFile(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
    await fs.writeFile(path.join(dataDir, 'trips.json'), JSON.stringify(trips, null, 2));
    await fs.writeFile(path.join(dataDir, 'places.json'), JSON.stringify(places, null, 2));
    await fs.writeFile(path.join(dataDir, 'hotels.json'), JSON.stringify(hotels, null, 2));
    await fs.writeFile(path.join(dataDir, 'transports.json'), JSON.stringify(transports, null, 2));
    
    console.log('✅ Örnek veriler başarıyla oluşturuldu!');
    console.log('📧 Demo kullanıcı: demo / demo123');
}

seedData().catch(console.error);