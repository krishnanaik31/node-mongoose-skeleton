// const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
import { constants as DB_CONST } from '../constant/database';
let storage = new GridFsStorage({
  url: DB_CONST.MONGO_URL,
  options: { useNewUrlParser: true },
  file: (req, file) => {
    return {
      bucketName: 'picture', //Setting collection name, default name is fs
      filename: file.originalname //Setting file name to original name of file
    };
  }
});

export default storage;
