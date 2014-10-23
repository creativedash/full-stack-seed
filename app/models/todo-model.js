var mongoose = require("mongoose"),
    TodoSchema;


    /**
     * Define Todo Schema
     * @type {mongoose}
     */
    TodoSchema = new mongoose.Schema({
        text: {
            type: String,
            required: "A todo requires text"
        },
        owner: {
            ref: "User",
            type: mongoose.Schema.ObjectId
        },
        created: {
            type: Date,
            default: Date.now
        }
    });


    // Expose Model
    module.exports = mongoose.model("Todo", TodoSchema);
