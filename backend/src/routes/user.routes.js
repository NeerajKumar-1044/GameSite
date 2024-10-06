import {Router} from 'express'
import {registerUser, Login, Logout, getCurrentUser, Get_All_Leadboard_List} from '../controllers/user.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/').get((req, res) => {
    res.json({ message: "Login to go to Home page" });
});

router.route('/register-user').post(registerUser);
router.route('/login-user').post(Login);
router.route('/logout-user').post(verifyJWT, Logout);
router.route('/get-current-user').get(verifyJWT, getCurrentUser);
router.route('/get-leaderboard').get(verifyJWT, Get_All_Leadboard_List);

export default router;   