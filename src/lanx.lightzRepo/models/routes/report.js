const express = require('express');
const router = express.Router();
const Report = require('../modules/Report');


// get all the reports
router.get('/', async(req, res) => {
    try{
        const reports = await Report.find();
        Res.json(reports)
    }catch(err){
        res.json({message: err})
    }
})

// submit a post 
router.post('/', async (req, res) => {
    const report = new post({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description
    });
    try{
        const saveReport = await report.save();
        res.json(saveReport)
    }catch( err){
        res.json({ message: err})
    }
})

// Delete a post 

router.delete('/:reportId', async (req, res) => {
    try{
        const removeReport = await Report.remove({_id: req.params.reportId});
    }catch(err){
        res.json({message: err})
    }
})

// update a post 
router.patch('/:reportId', async (req, res) => {
    try{
        const updateReport = Report.updateOne({_id: req.params.reportId},
            {$set: req.body.title})
    }catch( err){
        res.json({ message: err})
    }
})

module.exports = router;
