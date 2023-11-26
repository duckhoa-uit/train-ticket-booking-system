import multer from "multer";

import { STORAGE_PATH } from "./file";

export const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
};
const acceptedExt = Object.values(MIME_TYPE_MAP);
export type MimeKey = keyof typeof MIME_TYPE_MAP;

// Multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: STORAGE_PATH,
    filename(req, file, cb) {
      const timeStamp = Date.now();
      cb(
        null,
        file.originalname.toLowerCase().split(" ").join("-") +
          "-" +
          timeStamp +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    },
  }),
  // storage: multerS3({
  //   s3,
  //   bucket: APP_AWS_S3_BUCKET_NAME,
  //   metadata: function (req, file, cb) {
  //     cb(null, { fieldName: file.fieldname })
  //   },
  //   key: (req, file, cb) => {
  //     //converts left side of map sent to right side, getting proper extension
  //     const extension = MIME_TYPE_MAP[file.mimetype as MimeKey]

  //     // We use Random.id() instead of real files-store's _id
  //     // to secure files from reverse engineering on the AWS client
  //     const nameFile = `${Random.id()}-min.${extension}`

  //     cb(null, nameFile)
  //   },
  // }),
  fileFilter: (req, file, cb) => {
    const extension = MIME_TYPE_MAP[file.mimetype as MimeKey];

    if (!acceptedExt.includes(extension)) {
      cb(new Error("File type is not supported"));
      return;
    }

    if (file.size > 20971520) {
      cb(new Error("Please upload file with size equal or less than 20MB"));
    }

    cb(null, true);
  },
});
export default upload;
