const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    date: String,
    mileage: String,
    year:String,
    part:String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;