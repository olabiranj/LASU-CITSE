let mongoose = require("mongoose");

let Schema = mongoose.Schema;


let aboutusSchema = new Schema({
    newImg: { type: String },    
    content: { type: String },
    name: {type: String}, 
    createdDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("About", aboutusSchema)