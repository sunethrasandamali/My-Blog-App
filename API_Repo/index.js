const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'});
const fs = require('fs');
const path = require('path');

const salt = bcrypt.genSaltSync(10);
const secretcode = 'ABC%123%DEF';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://sunethrasandamali0:58zwM3ErxBliDUVo@blog.oxk0zwm.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async(req,res) =>{
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    }
    catch(e){
        res.status(400).json(e);
    }
});
  
app.post('/login', async(req,res) =>{
    const {username,password} = req.body;
  
        const userDoc = await User.findOne({ username });
        const pwdOK = bcrypt.compareSync(password,userDoc.password) 
       
        if (pwdOK) {

            jwt.sign({username,id:userDoc._id}, secretcode, {}, (err,token) => {
              if (err) throw err;
              res.cookie('token', token).json({
                id:userDoc._id,
                username,
              });
            });
          } 
          else 
          {
            res.status(400).json('wrong credentials');
          }
    
    
});

app.post('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secretcode, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });
  

  app.post('/createpost',uploadMiddleware.single('file'), async (req,res) => {

    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secretcode, {}, async(err,info) => {
      if (err) throw err;

      const {title,description,content,author} = req.body;

      console.log(req.body);

      const postDocument = await Post.create({
        title,
        description,
        content,
        cover: newPath,
        author:author,
      });

      res.json(postDocument);

    });
    
  });
    
app.get('/createpost', async(req,res) => {
  const posts = await Post.find()
  .populate('author',['username'])
  .sort({createdAt: -1})
  .limit(15);
  res.json(posts);
});

app.get(`/post/:id`, async (req, res) => {
  const {id} = req.params;
  const postDocument = await Post.findById(id).populate('author', ['username']);
  res.json(postDocument);
});

app.put('/post',uploadMiddleware.single('file'),async(req,res) => {
  let newPath = null;
  if(req.file){
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
 }

 const {token} = req.cookies;
    jwt.verify(token, secretcode, {}, async(err,info) => {
      if (err) throw err;

      const {id,title,description,content,author} = req.body;

      const postDocument = await Post.findById(id);
      
      const isAuthor = JSON.stringify(postDocument.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('You are not the author');
      }

      await postDocument.update({
        title,
        description,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });


      res.json(postDocument);
    });
  
})

app.listen(5000);

