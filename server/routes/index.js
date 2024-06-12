const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');


/**
 * App Router
 */

router.get('/' , mainController.homepage);


/**
 * GET About
 */
router.get('/about' , mainController.about);
// router.get('/' , mainController.homepage);
// router.get('/' , mainController.homepage);

module.exports = router;
