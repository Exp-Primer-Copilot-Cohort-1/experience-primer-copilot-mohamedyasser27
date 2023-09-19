//Create web server
// 1. Import express
const express = require('express');
const app = express();
// 2. Import body-parser
const bodyParser = require('body-parser');
// 3. Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 4. Import cors
const cors = require('cors');
// 5. Use cors
app.use(cors());
// 6. Create mongoose
const mongoose = require('mongoose');
// 7. Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
// 8. Create schema
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    username: String,
    comment: String
})
// 9. Create model
const Comment = mongoose.model('Comment', commentSchema);
// 10. Create routes
// 10.1. Get all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
// 10.2. Post a comment
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment({
            username: req.body.username,
            comment: req.body.comment
        })
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
// 10.3. Delete a comment
app.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        comment.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
// 10.4. Update a comment
app.put('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        comment.username = req.body.username;
        comment.comment = req.body.comment;
        comment.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
// 11. Listen on port 3000
app.listen(3000, () => console.log('Server running on port