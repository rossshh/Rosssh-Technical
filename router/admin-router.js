const express=require('express');
const router=express.Router();
const {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById}=require('../controllers/admin-controller');
const authMiddleware=require('../middlewares/auth-Middleware');
const adminMiddleware=require('../middlewares/admin-Middleware');

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.route("/contacts").get(authMiddleware,adminMiddleware,getAllContacts);
router.route("/users/:id").get(authMiddleware,adminMiddleware,getUserById);
router.route("/users/update/:id").get(authMiddleware,adminMiddleware,updateUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserById);

module.exports=router;