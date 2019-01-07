let mongoose = require("mongoose");

let Schema = mongoose.Schema;


let sliderSchema = new Schema({
    slider1: {
        name: {type: String},
        path: {type: String}
    },
    slider2: {
        name: {type: String},
        path: {type: String}
    },
    slider3: {
        name: {type: String},
        path: {type: String}
    },
    name: {type: String}
})


module.exports = mongoose.model("Slider", sliderSchema)