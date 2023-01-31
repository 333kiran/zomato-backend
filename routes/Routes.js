const express = require('express');


var { getCityList } = require('../controller/citycontroller');
// importing all the controllers to handle requests 
var cityController = require('../controller/citycontroller');
var mealTypeController = require('../controller/mealcontroller');
var restaurantController = require('../controller/Restaurantcontroller');

// initializing and resigtering express routers 
const router = express.Router();

// registering all the routes - API endpoints 
router.get('/getCityList', getCityList);
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/getRestaurantsbycity/:cityId', restaurantController.getRestaurantByCity);
router.get('/mealtype', mealTypeController.getMealType);
router.post('/restaurantfilter', restaurantController.filterSearch);
router.get('/getResById/:resId', restaurantController.getRestaurantById);
router.get('/getItemsbyrestaurant/:resId', restaurantController.getItemsByRestaurant);


router.post('/addcityList', cityController.addCityList);
router.post('/addmealtype', mealTypeController.addMealType);
router.post('/addRestaurantList', restaurantController.addRestaurantList);

module.exports = router;
