const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '632b1de35f6a8ec45c4fb7a3', // hard coded User CHANGE THIS IF DELETE USERS
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates:[23.3219, 42.6977]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dweqzjnfv/image/upload/v1663868174/YelpCamp/iml08pmlfc7pxhlm2mda.jpg',
                    filename: 'YelpCamp/iml08pmlfc7pxhlm2mda'
                },
                {
                    url: 'https://res.cloudinary.com/dweqzjnfv/image/upload/v1663868308/YelpCamp/fh9wcjbtbsj2y9nu4xey.jpg',
                    filename: 'YelpCamp/fh9wcjbtbsj2y9nu4xey'
                },
                {
                    url: 'https://res.cloudinary.com/dweqzjnfv/image/upload/v1663868347/YelpCamp/lnirzjck7g61l7tx2udo.jpg',
                    filename: 'YelpCamp/lnirzjck7g61l7tx2udo'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})