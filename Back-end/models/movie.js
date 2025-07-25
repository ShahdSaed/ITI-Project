const mongoose = require("mongoose");

let movieShema = new mongoose.Schema({
    id: Number,
    adult: Boolean,
    backdrop_path: String,
    genre_ids: [Number],
    id_: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
});

module.exports=mongoose.model('Movie',movieShema)
