const Media = require("../Models/Media");

exports.getAll =async(req, res)=>{
    try{
        const media =await Media.find().lean();
        console.log(media);
        res.json(media);
    } catch(error){
        console.log(error);
        res.status(400).json(error)
    }
};
// Backendurl/public/videos/file_name.mp4
exports.create = async(req, res) =>{

    const {title} = req.body;
    const {type} = req.body;    
    const {techStack} = req.body;
    const {developers} = req.body;
    const {description} = req.body;
    const {projectURL} = req.body;
    const {video} = req.body;
    let videosPaths =[];

if(Array.isArray(req.files.videos) && req.files.videos.length >0)    {
    for(let video of req.files.videos){
        videosPaths.push("/" + video.path);
    }
}  
try{
    const createdMedia = await Media.create({
        title,
        type,
        techStack,
        developers,
        description,
        projectURL,
        video,
        videos: videosPaths
    })
    res.json({message: 'media create successfully',createdMedia});
}catch(error){
    console.log(error);
    res.status(400).json(error);
}
};