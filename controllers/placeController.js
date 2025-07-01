const Trip = require('../models/Trip');
const Place = require('../models/Place');

exports.showNewPlaceForm = async (req, res) => {
    try {
        const trip = await Trip.getById(req.params.tripId);
        if (!trip) {
            req.session.error = 'Trip not found';
            return res.redirect('/');
        }
        res.render('places/new', { 
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

exports.createPlace = async (req, res) => {
    try {
        const place = new Place({
            tripId: req.params.tripId,
            name: req.body.name,
            address: req.body.address,
            description: req.body.description
        });
        
        await place.save();
        req.session.success = 'Place added successfully';
        res.redirect(`/trips/${req.params.tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error adding place';
        res.redirect(`/trips/${req.params.tripId}/places/new`);
    }
};

exports.showEditPlaceForm = async (req, res) => {
    try {
        const place = await Place.getById(req.params.id);
        if (!place) {
            req.session.error = 'Place not found';
            return res.redirect('/');
        }
        const trip = await Trip.getById(place.tripId);
        res.render('places/edit', { 
            place, 
            trip,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error editing place';
        res.redirect('/');
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const place = await Place.getById(req.params.id);
        if (!place) {
            req.session.error = 'Place not found';
            return res.redirect('/');
        }
        
        place.name = req.body.name;
        place.address = req.body.address;
        place.description = req.body.description;
        
        await place.save();
        req.session.success = 'Place updated successfully';
        res.redirect(`/trips/${place.tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error updating place';
        res.redirect(`/places/${req.params.id}/edit`);
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.getById(req.params.id);
        if (!place) {
            req.session.error = 'Place not found';
            return res.redirect('/');
        }
        
        const tripId = place.tripId;
        await Place.delete(req.params.id);
        req.session.success = 'Place deleted successfully';
        res.redirect(`/trips/${tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error deleting place';
        res.redirect('back');
    }
};
