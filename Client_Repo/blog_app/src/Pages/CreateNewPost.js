import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

function CreateNewPost(){

 const [title,setTitle] = useState('');
 const [description,setDescription] = useState('');
 const [content,setContent] = useState('');
 const [files, setFiles] = useState('');
 const [author,setAuthor] = useState("I am author");
 const [redirect,setRedirect] = useState(false);

    async function createNewPost(ev){

        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('file',files[0]);
        data.set('author',localStorage.getItem("username"));

        ev.preventDefault();

       const response = await fetch('http://localhost:5000/createpost', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <form onSubmit={createNewPost}>

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

            <ReactQuill  value={content} 
                         onChange={newValue => setContent(newValue)}
            />

            <button style={{marginTop:'5px'}}>Create New Post</button>
               
         </form>

    );
}

export default CreateNewPost;