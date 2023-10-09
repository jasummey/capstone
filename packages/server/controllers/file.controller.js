import path from "path";
import {uuid} from "uuidv4"

export async function uploadImage(req, res, next){
if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).json({error: "No files uploaded"});
}

const image = req.files.file;
const generatedImageName = uuid() + "." + image.name.split(".").at(-1);
const uploadPath = path.join(__dirname, "..", "public", "images", generatedImageName);
image.mv(uploadPath, (err) =>{
    if(err) {
        return res.sendStatus(500)
    }

    res.json({ path: `/public/images/${generatedImageName}`})
})
}