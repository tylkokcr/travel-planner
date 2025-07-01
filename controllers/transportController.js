const Trip = require('../models/Trip');
const Transport = require('../models/Transport');

exports.showNewTransportForm = async (req, res) => {
    try {
        const trip = await Trip.getById(req.params.tripId);
        if (!trip) {
            req.session.error = 'Trip not found';
            return res.redirect('/');
        }
        res.render('transports/new', { 
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

exports.createTransport = async (req, res) => {
    try {
        const transport = new Transport({
            tripId: req.params.tripId,
            type: req.body.type,
            from: req.body.from,
            to: req.body.to,
            date: req.body.date,
            time: req.body.time
        });
        
        await transport.save();
        req.session.success = 'Transport added successfully';
        res.redirect(`/trips/${req.params.tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error adding transport';
        res.redirect(`/trips/${req.params.tripId}/transports/new`);
    }
};

exports.showEditTransportForm = async (req, res) => {
    try {
        const transport = await Transport.getById(req.params.id);
        if (!transport) {
            req.session.error = 'Transport not found';
            return res.redirect('/');
        }
        const trip = await Trip.getById(transport.tripId);
        res.render('transports/edit', { 
            transport, 
            trip,
            user: res.locals.user,
            success: res.locals.success,
            error: res.locals.error
        });
    } catch (error) {
        console.error(error);
        req.session.error = 'Error editing transport';
        res.redirect('/');
    }
};

exports.updateTransport = async (req, res) => {
    try {
        const transport = await Transport.getById(req.params.id);
        if (!transport) {
            req.session.error = 'Transport not found';
            return res.redirect('/');
        }
        
        transport.type = req.body.type;
        transport.from = req.body.from;
        transport.to = req.body.to;
        transport.date = req.body.date;
        transport.time = req.body.time;
        
        await transport.save();
        req.session.success = 'Transport updated successfully';
        res.redirect(`/trips/${transport.tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error updating transport';
        res.redirect(`/transports/${req.params.id}/edit`);
    }
};

exports.deleteTransport = async (req, res) => {
    try {
        const transport = await Transport.getById(req.params.id);
        if (!transport) {
            req.session.error = 'Transport not found';
            return res.redirect('/');
        }
        
        const tripId = transport.tripId;
        await Transport.delete(req.params.id);
        req.session.success = 'Transport deleted successfully';
        res.redirect(`/trips/${tripId}`);
    } catch (error) {
        console.error(error);
        req.session.error = 'Error deleting transport';
        res.redirect('back');
    }
};
