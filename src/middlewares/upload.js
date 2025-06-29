import multer from "multer";
import crypto from "crypto";
import path from "path";

const tempFolder = path.resolve(__dirname, "../", "../", "uploads");
const tempUpload = path.resolve(tempFolder, "uploads");

export default {
  directory: tempFolder,
  uploadFolder: tempUpload,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {
      const hashFile = crypto.randomBytes(10).toString("hex");
      const nameFile = `${hashFile}-${file.originalname}`;

      return callback(null, nameFile);
    },
  }),
};
