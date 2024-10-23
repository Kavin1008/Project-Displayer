const express = require('express');
const mediaController = require('../controllers/mediaController')
const multer =require('multer');
const path = require('path');
const { mkdirSync, existsSync } = require('fs');


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (!existsSync("public")) {
            await mkdirSync("public");
        }

        if (!existsSync('public/videos')) {
            await mkdirSync("public/videos");
        }
        cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});


const upload = multer({
    storage : storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: function(req, file, cb){
        var ext = path.extname(file.originalname);
        if(ext !== '.mkv' && ext !== '.mp4'){
            return cb(new Error("Only Videos are allowed"));
        }
        cb(null, true);
    },
});

const router = express.Router();

//get all media
router.get("/all" , mediaController.getAll)


//post create new media

router.post(
    "/create",
    upload.fields([
    {
        name: "videos",
        maxCount: 5,
    }
]) ,mediaController.create)

module.exports =router;
