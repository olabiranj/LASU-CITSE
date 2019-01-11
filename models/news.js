let mongoose = require("mongoose");

let Schema = mongoose.Schema;


let newsSchema = new Schema({
    title: { type: String },
    newImg: { type: String },    
    writer: { type: String },
    department: { type: String },
    content: { type: String },
    createdDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("New", newsSchema)