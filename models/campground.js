const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('customedSizedImgUrl').get(function() {
    return this.url.replace('/upload', '/upload/w_160');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.clusterMapPopupInfo').get(function() {
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`;
})

CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({_id: {$in: doc.reviews}});
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);