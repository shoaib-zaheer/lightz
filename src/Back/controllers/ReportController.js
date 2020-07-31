const Report = require("../models/Report");

const create = async (req, res) => {
    try {
        let { city, state, electrified } = req.body;

        //validation
        if (!city || !state || !electrified) {
            return res.status(400).json({ msg: "Required field are empty" });
        }
        else if (city.length < 4) {
            return res.status(400).json({ msg: "City must have at least 4 characters" });
        }
        else if (state.length < 4) {
            return res.status(400).json({ msg: "State must have at least 4 characters" });
        }
        
        const newReport = new Report({
            city,
            state,
            electrified: electrified ? electrified : false
        });
        const savedReport = await newReport.save();
        res.json(savedReport)
    } 
    catch(err) {
        res.status(500).json({ error: err.message });
    }
};




module.exports = {
  create,
  
};
