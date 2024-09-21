const User = require('../Models/Schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const DefaultController = async (req, res) => {

    console.log("DEFAULT CONTROLLER");

    try{

        const users = await User.find();
        console.log("USERS : ", users);
        res.render('index', { users });

    }catch(err){

        console.error("ERROR : ", err);
        res.render('index');

    }

}

const LogInController = async (req, res) => {

    console.log("LOGIN CONTROLLER");

    try {

        const UserData = await User.findOne({ email: req.body.email });

        if(UserData){

            const DataUser = await bcrypt.compare(req.body.password, UserData.password);

            if(DataUser){

                console.log("Login successful");
                res.redirect('/');

            }else{

                console.log("Incorrect password");
                res.render('logIn', { message: 'Incorrect password, please try again.' });

            }

        }else{
            res.render('logIn', { message: 'User not found, please sign up.' });
        }

    }catch(err){

        console.error("ERROR:", err);
        res.render('logIn', { message: 'An error occurred. Please try again.' });

    }

};

const SignUpController = async (req, res) => {

    console.log("SIGNUP CONTROLLER");

    if(req.body.password === req.body.confirmPassword){

        try{

            const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

            const UserData = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            };

            const newUser = new User(UserData);
            await newUser.save();
            console.log("User Data:", UserData);
            res.redirect('/logIn');

        }catch(err){

            console.error("ERROR:", err);
            res.render('signUp', { message: 'An error occurred while signing up. Please try again.' });

        }

    }else{

        console.log("Passwords do not match");
        res.render('signUp', { message: 'Passwords do not match, please try again.' });

    }
};

module.exports = { DefaultController, LogInController, SignUpController };
