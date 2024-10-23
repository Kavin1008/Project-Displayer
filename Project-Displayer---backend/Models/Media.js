const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    type: {
        type: Array,
        require: true,
    },
    techStack:  {
        type: Array,
        require: true,
    },
    developers:  {
        type: Array,
        require: true,
    },
    description:  {
        type: String,
        require: true,
    },
    projectURL:  {
        type: String,
        require: true,
    },
    video:  {
        type: String,
        require: true,
    },
    videos: [{ type: String, require:true}],
},
{
    timestamps: true,
}
);

module.exports = Media = mongoose.model("Media", MediaSchema);
