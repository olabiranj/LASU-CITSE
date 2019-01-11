let mongoose = require("mongoose");

let Schema = mongoose.Schema;


let visionSchema = new Schema({
    newImg: { type: String },    
    content: { type: String },
    createdDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Vision", visionSchema)