const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '64b46c81e5537fa1536c99f0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dq1vvmyex/image/upload/v1690063542/bhaang7wjslu1kaezaww.jpg',
                  filename: 'bhaang7wjslu1kaezaww'
                }
              ],
            price: 1680,
            description: 'The OOD of LOVE',
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})