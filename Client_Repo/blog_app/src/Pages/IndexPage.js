import setDate from "date-fns/setDate/index";
import Post from "../Post";
import { useEffect, useState } from "react";

function IndexPage(){

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/createpost').then(Response =>{
      Response.json().then(posts => {
        setPosts(posts);
        console.log(posts);
      });
    });
  },[]);

    return(
    
      <>
        {posts.length > 0 && posts.map(post => (
         <div key={post._id}>
          <Post {...post} />
         </div>
        ))}
      </>
    
    );

}

export default IndexPage;