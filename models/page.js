let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PageSchema = new Schema({
    tag: {
        type: String
    },
    name: {
        type: String
    },
    content: {
        type: String
    },
    postImage: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Page", PageSchema)