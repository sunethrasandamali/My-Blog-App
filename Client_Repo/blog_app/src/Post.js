import React from "react";
import EBlog from './Images/EBlog.jpg';
import {formatISO9075} from "date-fns";
import './App.css';
import { Link, useParams } from "react-router-dom";

const Post = ({ _id,title, description,cover,image, content, author, createdAt}) => {

  return (
   
    <div className="blog-card">

      <div className="blog-image">
        <Link to={`/post/${_id}`}>
           <img src={'http://localhost:5000/'+cover}  alt="" width="500" />
        </Link>
      </div>
      
    
    
      <div className="blog-content">

        <Link to={`/post/${_id}`}>
          <h2 className="text">{title}</h2>
        </Link>

        <p className='desc'>{description} </p>

        <div className="blog-details">
          <span className="blog-author">Blog Author : {author} </span>
          <span><time  className="blog-date">{formatISO9075(new Date(createdAt))}</time></span>
        </div>
      
      </div>
    </div>
  );
};

export default Post;