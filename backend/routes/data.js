const express = require('express');
const router = express.Router();
import Data from '../models/data';

router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, messages: data });
    })
});

router.post('/putData', (req, res) => {

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
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    })
});

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

export default router;