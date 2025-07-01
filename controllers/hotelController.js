const Trip = require('../models/Trip');
const Hotel = require('../models/Hotel');

exports.showNewHotelForm = async (req, res) => {
    try {
        const trip = await Trip.getById(req.params.tripId);
        if (!trip) {
            req.session.error = 'Trip not found';
            return res.redirect('/');
        }
        res.render('hotels/new', { 
            trip,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error displaying form';
        res.redirect('/');
    }
};

exports.createHotel = async (req, res) => {
    try {
        const hotel = new Hotel({
            tripId: req.params.tripId,
            name: req.body.name,
            address: req.body.address,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        });
        
        await hotel.save();
        req.session.success = 'Hotel added successfully';
        res.redirect(`/trips/${req.params.tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error adding hotel';
        res.redirect(`/trips/${req.params.tripId}/hotels/new`);
    }
};

exports.showEditHotelForm = async (req, res) => {
    try {
        const hotel = await Hotel.getById(req.params.id);
        if (!hotel) {
            req.session.error = 'Hotel not found';
            return res.redirect('/');
        }
        const trip = await Trip.getById(hotel.tripId);
        res.render('hotels/edit', { 
            hotel, 
            trip,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error editing hotel';
        res.redirect('/');
    }
};

exports.updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.getById(req.params.id);
        if (!hotel) {
            req.session.error = 'Hotel not found';
            return res.redirect('/');
        }
        
        hotel.name = req.body.name;
        hotel.address = req.body.address;
        hotel.checkIn = req.body.checkIn;
        hotel.checkOut = req.body.checkOut;
        
        await hotel.save();
        req.session.success = 'Hotel updated successfully';
        res.redirect(`/trips/${hotel.tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error updating hotel';
        res.redirect(`/hotels/${req.params.id}/edit`);
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.getById(req.params.id);
        if (!hotel) {
            req.session.error = 'Hotel not found';
            return res.redirect('/');
        }
        
        const tripId = hotel.tripId;
        await Hotel.delete(req.params.id);
        req.session.success = 'Hotel deleted successfully';
        res.redirect(`/trips/${tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error deleting hotel';
        res.redirect('back');
    }
};