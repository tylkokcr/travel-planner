const Trip = require('../models/Trip');
const Place = require('../models/Place');
const Hotel = require('../models/Hotel');
const Transport = require('../models/Transport');

exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.getAll();
        res.render('index', { 
            trips,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error loading trips';
        res.redirect('/');
    }
};

exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.getById(req.params.id);
        if (!trip) {
            req.session.error = 'Trip not found';
            return res.redirect('/');
        }
        
        const places = await Place.getByTripId(trip.id);
        const hotels = await Hotel.getByTripId(trip.id);
        const transports = await Transport.getByTripId(trip.id);
        
        res.render('trips/show', { 
            trip, 
            places, 
            hotels, 
            transports,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error loading trip details';
        res.redirect('/');
    }
};

exports.showNewTripForm = (req, res) => {
    res.render('trips/new', {
        user: res.locals.user,
        success: res.locals.success,
        error: res.locals.error
    });
};

exports.createTrip = async (req, res) => {
    try {
        const trip = new Trip({
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description
        });
        
        await trip.save();
        req.session.success = 'Trip created successfully';
        res.redirect(`/trips/${trip.id}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error creating trip';
        res.redirect('/trips/new');
    }
};

exports.showEditTripForm = async (req, res) => {
    try {
        const trip = await Trip.getById(req.params.id);
        if (!trip) {
            req.session.error = 'Trip not found';
            return res.redirect('/');
        }
        res.render('trips/edit', { 
            trip,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error editing trip';
        res.redirect('/');
    }
};

exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.getById(req.params.id);
        if (!trip) {
            req.session.error = 'Trip not found';
            return res.redirect('/');
        }
        
        trip.name = req.body.name;
        trip.startDate = req.body.startDate;
        trip.endDate = req.body.endDate;
        trip.description = req.body.description;
        
        await trip.save();
        req.session.success = 'Trip updated successfully';
        res.redirect(`/trips/${trip.id}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error updating trip';
        res.redirect(`/trips/${req.params.id}/edit`);
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        await Trip.delete(req.params.id);
        req.session.success = 'Trip deleted successfully';
        res.redirect('/');
    } catch (error) {
        console.error(error);
        req.session.error = 'Error deleting trip';
        res.redirect('/');
    }
};