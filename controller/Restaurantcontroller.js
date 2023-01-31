const Restaurant = require('../models/restaurantmodel');  // importing the Restaurant Model
const Item = require('../models/itemmodel');

// filter function to filter the data based on multiple params
exports.filterSearch = (req, res, next) => {
    const queryParams = req.body;   // capturing all the params from request body

    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;    // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1;    // 1 means ascending order & -1 means descending order
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 5; // number of items per page 

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;   // setting the values for start and end params for pagination
    end = Number(page * perPageCount);
    let payload = {};   // Initializing the payload to request

    // Initializing the payload object for quering the DB
    if (mealtype_id) {
        payload = {
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && hcost && lcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (mealtype_id && location_id) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && cuisine_id) {
        payload = {
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id) {
        payload = {
            location_id: Number(location_id),
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (location_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    Restaurant.find(payload).sort({ min_price: sort }).then(result => {
        const count = Math.ceil(result.length / 5);
        const pageCountArr = [];
        const resultValues = result.slice(start, end);  // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: resultValues, pageCount: pageCountArr, totalCount: result.length });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
}


exports.getAllRestaurants =  (req, res, next) => {
    Restaurant.find().then(result => {
        res.status(200).json({ message: "Restaurants Fetched Sucessfully", Restaurants: result })
    })
}

// getRestaurantByCity function to get restaurants by city name
exports.getRestaurantByCity = async (req, res) => {
    const location_id = req.params.cityid;
   await Restaurant.find({location_id }).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurantList: result })
    }).catch(err => console.log(err));
}




// getItemsByRestaurant function to get Items by rest name
exports.getItemsByRestaurant =  async (req, res) => {
    const resId = req.params.resId;
  await  Item.find({ restaurantId: resId }).then(result => {
        res.status(200).json({ message: "Restaurant Items Fetched Sucessfully", itemsList: result })
    }).catch(err => console.log(err));
}

// getRestaurantById function to get restaurants by Id
exports.getRestaurantById = async (req, res, next) => {
 const resId = req.params.resId;
   await Restaurant.findById(resId).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}

// addRestaurantList function to add restaurants to DB
exports.addRestaurantList = (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    const logo = req.body.logo;
    const Rest = new Restaurant({ name: name, address: address, logo: logo });
    Rest.save().then(result => {
        res.status(200).json({ message: "Restaurant Added Sucessfully", restaurant: result })
    }).catch(err => {
        console.log(err)
    })
}