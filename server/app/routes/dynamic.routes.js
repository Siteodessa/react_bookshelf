const multer = require("multer");
const path = require('path');
const fs = require('fs');
const mediaDir = path.join(__dirname, '../../MediaUploads');
module.exports = (app, key) => {
    const dynamic = require('../controllers/dynamic.controller.js');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, mediaDir)
        },
        filename: (req, file, cb) => {

            fs.exists(`${mediaDir}/${file.originalname}`, function(exists) {
                let uploadedFileName;
                if (exists) {
                    uploadedFileName = dynamic.GetNameFromDate() + '.' + file.originalname;
                } else {
                    uploadedFileName = file.originalname;
                }
                cb(null, uploadedFileName)
            });

            // cb(null, `${dynamic.GetNameFromDate()}${path.extname(file.originalname)}`)
        }
    });
    const upload = multer({storage: storage});

    //Create
    app.post(`/${key}`, dynamic.CreateRecord);

    //Update
    app.put(`/${key}/:_id`, dynamic.UpdateRecord);

    //Get
    app.get(`/${key}`, dynamic.GetRecord);

    //Get By Id
    app.get(`/${key}/:_id`, dynamic.GetRecordById);

    //Delete
    app.delete(`/${key}/:_id`, dynamic.DeleteRecord);


    //Static Route for Image Upload
    app.post('/upload', upload.array('image', 100), dynamic.UploadMedia);
    app.get('/MediaUploads/:name', dynamic.GetFile);
    //End Static Route for Image Upload


}
