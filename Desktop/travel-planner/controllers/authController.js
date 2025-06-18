const User = require('../models/User');

exports.showLoginForm = (req, res) => {
    res.render('auth/login', {
        user: res.locals.user,
        success: res.locals.success,
        error: res.locals.error
    });
};

exports.showRegisterForm = (req, res) => {
    res.render('auth/register', {
        user: res.locals.user,
        success: res.locals.success,
        error: res.locals.error
    });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.getByUsername(username);
        
        if (!user) {
            req.session.error = 'Invalid username or password';
            return res.redirect('/login');
        }
        
        const isValidPassword = await user.comparePassword(password);
        
        if (!isValidPassword) {
            req.session.error = 'Invalid username or password';
            return res.redirect('/login');
        }
        
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.success = 'Login successful';
        
        res.redirect('/');
    } catch (error) {
        console.error(error);
        req.session.error = 'Error during login';
        res.redirect('/login');
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;
        
        if (password !== passwordConfirm) {
            req.session.error = 'Passwords do not match';
            return res.redirect('/register');
        }
        
        const existingUser = await User.getByUsername(username);
        if (existingUser) {
            req.session.error = 'Username already taken';
            return res.redirect('/register');
        }
        
        const existingEmail = await User.getByEmail(email);
        if (existingEmail) {
            req.session.error = 'Email already in use';
            return res.redirect('/register');
        }
        
        const user = new User({
            username,
            email,
            password
        });
        
        await user.save();
        
        req.session.success = 'Registration successful! You can now login';
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.session.error = 'Error during registration';
        res.redirect('/register');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
};