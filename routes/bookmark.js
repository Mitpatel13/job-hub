const router = require('express').Router();
const bookMarkController = require('../controllers/bookMarkController');
const { verifyAndAuthorization, verifyToken } = require('../middleware/verifyToken');

// CREATE BOOKMARK 
  router.post('/',verifyAndAuthorization,bookMarkController.addBookMark);

// REMOVE BOOKMARK
router.delete('/:id',verifyToken,bookMarkController.deleteBookMark);
// GET BOOKMARK
router.get('/:userId',bookMarkController.getBookMark);

module.exports = router;