// app.js - Główny plik aplikacji
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
//const expressLayouts = require('express-ejs-layouts');
const path = require('path');
require('dotenv').config();

// Import kontrolerów
const tripController = require('./controllers/tripController');
const placeController = require('./controllers/placeController');
const hotelController = require('./controllers/hotelController');
const transportController = require('./controllers/transportController');
const authController = require('./controllers/authController');

// Import middleware
const { requireAuth, redirectIfAuthenticated } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ŞÖYLE DEĞİŞTİRİN:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.use(expressLayouts);
//app.set('layout', 'layout'); // layout.ejs dosyasını kullan
//app.set('layout extractScripts', true); // Script'leri ayıkla
//app.set('layout extractStyles', true);  // Style'ları ayıkla

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'travel-app-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 * 24 } // 24 godziny
}));

// Middleware dla komunikatów flash
app.use((req, res, next) => {
    res.locals.success = req.session.success;
    res.locals.error = req.session.error;
    res.locals.user = req.session.userId ? {
        id: req.session.userId,
        username: req.session.username
    } : null;
    delete req.session.success;
    delete req.session.error;
    next();
});

// Routing
// Auth routes
app.get('/login', redirectIfAuthenticated, authController.showLoginForm);
app.post('/login', redirectIfAuthenticated, authController.login);
app.get('/register', redirectIfAuthenticated, authController.showRegisterForm);
app.post('/register', redirectIfAuthenticated, authController.register);
app.get('/logout', authController.logout);

// Strona główna
app.get('/', requireAuth, tripController.getAllTrips);

// Podróże
app.get('/trips/new', requireAuth, tripController.showNewTripForm);
app.post('/trips', requireAuth, tripController.createTrip);
app.get('/trips/:id', requireAuth, tripController.getTripById);
app.get('/trips/:id/edit', requireAuth, tripController.showEditTripForm);
app.put('/trips/:id', requireAuth, tripController.updateTrip);
app.delete('/trips/:id', requireAuth, tripController.deleteTrip);

// Miejsca
app.get('/trips/:tripId/places/new', requireAuth, placeController.showNewPlaceForm);
app.post('/trips/:tripId/places', requireAuth, placeController.createPlace);
app.get('/places/:id/edit', requireAuth, placeController.showEditPlaceForm);
app.put('/places/:id', requireAuth, placeController.updatePlace);
app.delete('/places/:id', requireAuth, placeController.deletePlace);

// Hotele
app.get('/trips/:tripId/hotels/new', requireAuth, hotelController.showNewHotelForm);
app.post('/trips/:tripId/hotels', requireAuth, hotelController.createHotel);
app.get('/hotels/:id/edit', requireAuth, hotelController.showEditHotelForm);
app.put('/hotels/:id', requireAuth, hotelController.updateHotel);
app.delete('/hotels/:id', requireAuth, hotelController.deleteHotel);

// Transport
app.get('/trips/:tripId/transports/new', requireAuth, transportController.showNewTransportForm);
app.post('/trips/:tripId/transports', requireAuth, transportController.createTransport);
app.get('/transports/:id/edit', requireAuth, transportController.showEditTransportForm);
app.put('/transports/:id', requireAuth, transportController.updateTransport);
app.delete('/transports/:id', requireAuth, transportController.deleteTransport);

// Obsługa błędów 404
app.use((req, res) => {
    res.status(404).render('error', { 
        message: 'Page not found',
        status: 404 
    });
});

// Obsługa błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        message: 'Server error',
        status: 500 
    });
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
    console.log(`Aplikacja dostępna pod adresem: http://localhost:${PORT}`);
});