import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import mypass from '../utils/passport';

mypass(passport);
var secret = "thisisasecretstring";

const router = express.Router();
router.post('/signup', (req, res) => {
    console.log('signup user '+ req.body.name);
    if (!req.body.name || !req.body.password) {
        res.json({ success: false, message: 'Input name && password.' });
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        // save user info
        newUser.save((err) => {
            if (err) {
                return res.json({ success: false, message: 'Signup failed!' });
            }
            res.json({ success: true, message: 'Signup successfully!' });
        });
    }
});

// check password, then generate token for it if success
router.post('/accesstoken', (req, res) => {
    console.log('find user '+ req.body.name);
    User.findOne({
        name: req.body.name
    }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({ success: false, message: 'User does not exist!' });
        } else if (user) {
            // check the password
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign({ name: user.name }, secret, {
                        expiresIn: 60*20 // token expire time, 20 min
                    });
                    user.token = token;
                    user.save(function (err) {
                        if (err) {
                            res.send(err);
                        }
                    });
                    res.json({
                        success: true,
                        message: 'User check successfully!',
                        token: 'Bearer ' + token,
                        name: user.name
                    });
                } else {
                    res.send({ success: false, message: 'Wrong password!' });
                }
            });
        }
    });
});

router.get('/user_info',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json({ username: req.user.name });
    });

router.get('/list', passport.authenticate('bearer', { session: false }), (req, res) => {
    console.log('list all users');
    User.find((err, results) => {
        if (err) {
            return res.json({ success: false, message: 'Find all failed!' });
        } else {
            var userList = results.map(ret => {
                return {
                    name: ret.name
                }
            });
            return res.json({ success: true, userList });
        }
    })
})

router.delete('/delete', passport.authenticate('bearer', { session: false }), (req, res) => {
    console.log('delete user ' + req.param("name"));
    User.deleteOne({
        name: req.param("name")
    }, (err, result) => {
        if (err) {
            return res.json({ success: false, message: 'Delete failed!' });
        } else {
            if(result.deletedCount === 1){
                return res.json({ success: true, message: 'Delete success!' });
            }else{
                return res.json({ success: false, message: 'Delete failed!' });
            }
        }
    })
})
export default router;
