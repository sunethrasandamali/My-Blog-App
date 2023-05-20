const mongoose = require('mongoose');
const { UserContext } = require('../../Client_Repo/blog_app/src/UserContext.js');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
   title: String,
   description: String,
   content: String,
   cover: String, 
   author: String,
},{
    timestamps: true,
});

const PostModel = model('Post',PostSchema);

module.exports = PostModel;