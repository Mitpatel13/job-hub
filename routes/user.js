const userController = require('../controllers/userController');
const { verifyAndAuthorization,verifyToken, verifyAdmin } = require('../middleware/verifyToken');

const router = require('express').Router();

//UPDATE USER
 router.put("/:id",verifyAndAuthorization,userController.updateUser);

 // DELETE USER
 router.delete("/:id",verifyAndAuthorization,userController.deleteUser);

 // GET USER

 router.get("/:id",verifyAndAuthorization,userController.getUser);

 // GET ALL USER

 router.get("/",verifyAdmin,userController.getAllUser)


module.exports = router;