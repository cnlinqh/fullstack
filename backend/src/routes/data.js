import express from 'express';
import Data from '../models/data';
import passport from 'passport';
import mypass from '../utils/passport';

mypass(passport);

const router = express.Router();
router.get('/getData', passport.authenticate('bearer', { session: false }), (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, messages: data });
    })
});

router.post('/putData', passport.authenticate('bearer', { session: false }), (req, res) => {
    const { id, message } = req.body;
    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'Invalid Inputs'
        });
    }
    let data = new Data();
    data.id = id;
    data.message = message;
    data.save((err, node) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, node });
    })
});

router.delete('/deleteData', passport.authenticate('bearer', { session: false }), (req, res) => {
    const { _id } = req.body;
    Data.findByIdAndRemove(_id, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, node: { _id } });
    });
});

router.delete('/deleteAll', passport.authenticate('bearer', { session: false }), (req, res) => {
    Data.deleteMany({}, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/updateData', passport.authenticate('bearer', { session: false }), (req, res) => {
    const { _id, update } = req.body;
    Data.findByIdAndUpdate(_id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, node: { _id, update } });
    });
    Data.deleteMany
});

router.post('/prepareData', (req, res) => {
    // router.post('/prepareData', passport.authenticate('bearer', { session: false }), (req, res) => {
    const { count } = req.body;
    Data.deleteMany({}, (err) => {
        if (err) {
            return res.json({ success: false, message: "Failed to delete all data during preparation." })
        }
    });
    var num = 1000;
    if (count) {
        num = count;
    }
    for (let i = 0; i < num; i++) {
        let data = new Data();
        data.id = i;
        data.message = Math.random().toString(36).substring(2, 15);
        data.save()
    }
    return res.json({ success: true, message: "count = " + num });
});

export default router;