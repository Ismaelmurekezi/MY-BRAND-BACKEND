import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!(extension === '.jpg' || extension === '.jpeg' || extension === '.png')) {
    cb(new Error('Unsupported file!'));
    return;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;