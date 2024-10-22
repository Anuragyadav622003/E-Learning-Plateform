import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination : function(req , file, cb){
    cb(null , path.resolve(__dirname , "../../Public/temp"));
  },
  filename : function (req ,file , cb){
    cb(null, file.originalname);
  }
});

const upload = multer ({storage ,});
export default upload ;