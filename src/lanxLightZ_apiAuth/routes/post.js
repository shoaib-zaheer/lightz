const router = require('express').Router();
const verify = require('./verifyToken')



router.get('/', (req, res) => {
   res.send(req.user);
   user.findByOne({_id: req.user})
})



module.exports = router;