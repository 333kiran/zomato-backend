const City = require ('../models/citymodel');  // importing the City Model

// getCityList function to return all the location list for Dropdown
 exports. getCityList =  async (req, res) => {
     
    const city = await City.find()
    res.json(city);
}
 
 

// addCityList to add location to DB
exports.addCityList = (req, res, next) => {
    const name = req.body.name;
    const city_id = req.body.city_id;
    const location_id = req.body.location_id;
    const country_name = req.body.country_name;
    const Cities = new City({ name: name, city_id: city_id, location_id: location_id, country_name: country_name });
    Cities.save().then(result => {
        res.status(200).json({ message: "City Added Sucessfully", city: result })
    }).catch(err => {
        console.log(err)
    })
}