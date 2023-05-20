import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";
import SinglePostPage from "./SinglePostPage";

function EditSinglePostPage(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [cover,setCover] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [singlePostInfo,setSinglePostInfo] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/post/'+id)
          .then(response => {
            response.json().then(singlePostInfo => {
              setTitle(singlePostInfo.title);
              setContent(singlePostInfo.content);
              setDescription(singlePostInfo.description);
            });
          });
      }, []);
    

    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
          data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:5000/post', {
          method: 'PUT',
          body: data,
          credentials: 'include',
        });
        if (response.ok) {
          setRedirect(true);
        }
    }


    if(redirect){
        return <Navigate to={'/post/'+id} />
    }

 return(
    <form onSubmit={updatePost}>

        <input type="title" 
            placeholder={'Title'}
            value={title}
            onChange={ev => setTitle(ev.target.value)}/>

        <input type="description" 
            placeholder={'description'}
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            />

        <input type="file" 
               onChange={ev => setFiles(ev.target.files)} />

        <Editor onChange={setContent} value={content} />

        <button style={{marginTop:'5px'}}>Update post</button>
           
     </form>

);
}

export default EditSinglePostPage;