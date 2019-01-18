const multer = require("multer");
const path = require('path');
const fs = require('fs');
const mediaDir = path.join(__dirname, '../../MediaUploads');
module.exports = (app) => {
    const books = require('../controllers/book.controller.js');


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, mediaDir)
        },
        filename: (req, file, cb) => {

            fs.exists(`${mediaDir}/${file.originalname}`, function(exists) {
                let uploadedFileName;
                if (exists) {
                    uploadedFileName = books.GetNameFromDate() + '.' + file.originalname;
                } else {
                    uploadedFileName = file.originalname;
                }
                cb(null, uploadedFileName)
            });

            // cb(null, `${dynamic.GetNameFromDate()}${path.extname(file.originalname)}`)
        }
    });
    const upload = multer({storage: storage});

//Static Route for Image Upload
    app.post('/upload', upload.array('image', 100), books.UploadMedia);
    app.get('/MediaUploads/:name', books.GetFile);
    //End Static Route for Image Upload





    // Create a new Note
    app.post('/books', books.create);

    // Retrieve all Notes
    app.get('/books', books.findAll);

    // Retrieve a single Note with noteId
    app.get('/books/:bookId', books.findOne);

    // Update a Note with noteId
    app.put('/books/:bookId', books.update);

    // Delete a Note with noteId
    app.delete('/books/:bookId', books.delete);
}
