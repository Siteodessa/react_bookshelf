const Book = require('../models/book.model.js');
var path = require('path');
var FilePath = path.join(__dirname, '../../MediaUploads');






// Create and Save a new Book
exports.create = (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: "Book title can not be empty"
        });
    }

    // Create a Book
    const note = new Book({
        title: req.body.title || "Untitled Book",
        author: req.body.author || "Author Unknown",
        bookfile: req.body.bookfile || "No cover",
    });

    // Save Book in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};






// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Book.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};




// Find a single note with a noteId
exports.findOne = (req, res) => {
    Book.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};









// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Find note and update it with the request body
    Book.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Book",
            content: req.body.content
        }, {
            new: true
        })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};








exports.UploadMedia = (req, res) => {

console.log('process.env.HostUrl', process.env.HostUrl);
    const files = req.files.map(file => ({ url: `${process.env.HostUrl }/MediaUploads/${file.filename}`, title : file.originalname}));
    console.log('files', files);
    res.json({
        message: "Images Uploaded Successfully...",
        images: files
    });

};

exports.GetFile = (req, res) => {
    var File = FilePath + "/" + req.params.name;
    res.sendFile(File);
}







// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.noteId
                });
            }
            res.send({
                message: "Book deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};


exports.GetNameFromDate =() => {
    const d = new Date();
    const curr_date = d.getDate();
    const curr_month = d.getMonth() + 1; //Months are zero based
    const curr_year = d.getFullYear();
    const seconds = d.getSeconds();
    const minutes = d.getMinutes();
    const hour = d.getHours();
    const milisec = d.getMilliseconds();
    return curr_year.toString() + curr_month.toString() + curr_date.toString() + hour.toString() + minutes.toString() + seconds.toString() + milisec.toString();
};
