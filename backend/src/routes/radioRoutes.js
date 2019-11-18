var express = require('express');
var router = express.Router();
var radioController = require('../controllers/radioController.js');

/*
 * GET
 */
router.get('/', radioController.list);

/*
 * GET
 */
router.get('/:id', radioController.show);

/*
 * POST
 */
router.post('/', radioController.create);

/*
 * PUT
 */
router.put('/:id', radioController.update);

/*
 * DELETE
 */
router.delete('/:id', radioController.remove);

module.exports = router;
