const express = require('express')
const router = express.Router()

const category_controller = require('../controllers/categoryController')
const item_controller = require('../controllers/itemController')

//CATEGORY ROUTES

//GET homepage

router.get('/',category_controller.index)

//GET list of categories

router.get('/categories',category_controller.category_list)

//GET a single category

router.get('/categories/:id',category_controller.category_single)

//GET request for creating a category

router.get('/category/create',category_controller.category_create_get)

//POST request for creating a category

router.post('/category/create',category_controller.category_create_post)

//GET request for deleting a category
router.get('/category/:id/delete',category_controller.category_delete_get)

//POST request for deleting a category

router.post('/category/:id/delete',category_controller.category_delete_post)

//ITEM ROUTES

//GET list of categories

router.get('/items',item_controller.item_list)

//GET a single item

router.get('/items/:id',item_controller.item_single)

//GET request for creating an item

router.get('/item/create',item_controller.item_create_get)

//POST request for creating an item

router.post('/item/create',item_controller.item_create_post)

//GET request for deleting an item
router.get('/items/:id/delete',item_controller.item_delete_get)

//POST request for deleting an item

router.post('/items/:id/delete',item_controller.item_delete_post)

module.exports = router;