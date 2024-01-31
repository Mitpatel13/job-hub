const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { verifyAdmin } = require('../middleware/verifyToken');

// CREATE JOB

router.post('/',verifyAdmin,jobController.createJob);
// UPDATE JOB
router.put('/:id',verifyAdmin,jobController.updateJob);
// DELETE JOB
router.delete('/:id',verifyAdmin,jobController.deleteJob);
//GET JOB
router.get('/:id',jobController.getJob);
//GET ALL JOBS
router.get('/',jobController.getAllJob);
// GET SEARCH JOB BY KEY
router.get('/search/:key',jobController.searchJob);
module.exports = router;

